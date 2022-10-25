import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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
      const filePath = `image-leadership-${image.name}-${session.date}`
      const fileRef = this.storage.ref(filePath);
      const task = this.storage.upload(filePath, image);
    
      task.snapshotChanges().pipe(
        finalize(() => {
          this.downloadURL = fileRef.getDownloadURL()
          this.downloadURL.forEach(async (url: any) => {
            if (url) {
              session.galleryURLs.push(url)
              await this.firestoreService.updateData(session, 'leadership-academy-sessions')
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
      const filePath = `image-leadership-${image.name}-${conference.date}`
      const fileRef = this.storage.ref(filePath);
      const task = this.storage.upload(filePath, image);
    
      task.snapshotChanges().pipe(
        finalize(() => {
          this.downloadURL = fileRef.getDownloadURL()
          this.downloadURL.forEach(async (url: any) => {
            if (url) {
              const foundConference = country.conferences[country.conferences.findIndex((countryConference: any) => countryConference.date === conference.date)]
              foundConference.galleryURLs.push(url)
              await this.firestoreService.updateData(country, 'leadership-academy-countries')
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
