import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { finalize, Observable } from 'rxjs';
import { FirestoreService } from 'src/app/shared/services/firestore.service';
import { ModalService } from 'src/app/shared/services/modal.service';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';

@Component({
  selector: 'app-add-images',
  templateUrl: './add-images.component.html',
  styleUrls: ['./add-images.component.scss']
})
export class AddImagesComponent implements OnInit {
  addImagesForm!: FormGroup
  loading = false
  fileCount = 1
  images: Array<any> = []
  downloadURL!: Observable<string>;

  constructor(
    public modalService: ModalService,
    private storage: AngularFireStorage,
    private firestoreService: FirestoreService,
    private snackbarService: SnackbarService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.addImagesForm = new FormGroup({
      'images': new FormControl(null, [Validators.required]),
    })
  }

  onSubmit(): void {
    if (this.loading) return
    this.addImagesForm.markAllAsTouched()
    if (!this.addImagesForm.valid) return
    this.loading = true

    if (this.modalService.data.session) {
      this.addSessionImage()
    } else {
      this.addConferenceImage()
    }
  }

  addSessionImage(): void {
    this.fileCount = 1
    const { session } = this.modalService.data

    for (const image of this.images) {
      let filePath = ''
      if (this.router.url.includes('leadership-academy')) {
        filePath = `${session.name}-image-leadership-${image.name}`
      } else if (this.router.url.includes('the-forum')) {
        filePath = `${session.name}-image-forum-${image.name}`
      } else if (this.router.url.includes('pauline')) {
        filePath = `${session.name}-image-pauline-${image.name}`
      }

      const fileRef = this.storage.ref(filePath);
      const task = this.storage.upload(filePath, image);
    
      task.snapshotChanges().pipe(
        finalize(() => {
          this.downloadURL = fileRef.getDownloadURL()
          this.downloadURL.forEach(async (url: any) => {
            if (url) {
              session.galleryURLs.push(url)
              if (this.router.url.includes('leadership-academy')) {
                await this.firestoreService.updateData(session, 'leadership-academy-sessions')
                this.modalService.leadershipSessionChangedSubject.next(session)
              } else if (this.router.url.includes('the-forum')) {
                await this.firestoreService.updateData(session, 'the-forum-sessions')
                this.modalService.forumSessionChangedSubject.next(session)
              } else if (this.router.url.includes('pauline')) {
                await this.firestoreService.updateData(session, 'pauline-leadership-sessions')
                this.modalService.paulineSessionChangedSubject.next(session)
              }
              this.fileCount++

              if (this.fileCount > this.images.length) {
                this.loading = false
                this.snackbarService.showSnackbar({ text: 'Image(s) successfully uploaded!', success: true })
                this.modalService.closeModal()
              }
            }
          })
        })
      ).subscribe()
    }
  }

  addConferenceImage(): void {
    this.fileCount = 1
    const { country, conference } = this.modalService.data

    for (const image of this.images) {
      let filePath = ''
      if (this.router.url.includes('leadership-academy')) {
        filePath = `${conference.date.seconds}-image-leadership-${image.name}`
      } else if (this.router.url.includes('the-forum')) {
        filePath = `${conference.date.seconds}-image-forum-${image.name}`
      } else if (this.router.url.includes('pauline')) {
        filePath = `${conference.date.seconds}-image-pauline-${image.name}`
      }

      const fileRef = this.storage.ref(filePath);
      const task = this.storage.upload(filePath, image);
    
      task.snapshotChanges().pipe(
        finalize(() => {
          this.downloadURL = fileRef.getDownloadURL()
          this.downloadURL.forEach(async (url: any) => {
            if (url) {
              const foundConference = country.conferences[country.conferences.findIndex((countryConference: any) => countryConference.date === conference.date)]
              foundConference.galleryURLs.push(url)
              if (this.router.url.includes('leadership-academy')) {
                await this.firestoreService.updateData(country, 'leadership-academy-countries')
                this.modalService.leadershipCountryChangedSubject.next(country)
              } else if (this.router.url.includes('the-forum')) {
                await this.firestoreService.updateData(country, 'the-forum-countries')
                this.modalService.forumCountryChangedSubject.next(country)
              } else if (this.router.url.includes('pauline')) {
                await this.firestoreService.updateData(country, 'pauline-leadership-countries')
              }
              this.fileCount++

              if (this.fileCount > this.images.length) {
                this.loading = false
                this.snackbarService.showSnackbar({ text: 'Image(s) successfully uploaded!', success: true })
                this.modalService.closeModal()
              }
            }
          })
        })
      ).subscribe()
    }
  }

  setImages(event: any) {
    this.images = event.target.files
  }
}
