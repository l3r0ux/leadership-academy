import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { finalize, Observable } from 'rxjs';
import { FirestoreService } from 'src/app/shared/services/firestore.service';
import { ModalService } from 'src/app/shared/services/modal.service';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';

@Component({
  selector: 'app-add-video',
  templateUrl: './add-video.component.html',
  styleUrls: ['./add-video.component.scss']
})
export class AddVideoComponent implements OnInit {
  addVideoForm!: FormGroup
  loading = false
  video: any
  uploadPercent!: Observable<number | undefined>;
  downloadURL!: Observable<string>;

  constructor(
    public modalService: ModalService,
    private storage: AngularFireStorage,
    private firestoreService: FirestoreService,
    private snackbarService: SnackbarService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.addVideoForm = new FormGroup({
      'title': new FormControl(null, [Validators.required]),
      'video': new FormControl(null, [Validators.required])
    })
  }

  onSubmit(): void {
    if (this.loading) return
    this.addVideoForm.markAllAsTouched()
    if (!this.addVideoForm.valid) return
    this.loading = true

    if (this.modalService.data.session) {
      this.addSessionVideo()
    } else {
      this.addConferenceVideo()
    }
      
  }

  addConferenceVideo(): void {
    const { title } = this.addVideoForm.value
    const { country, conference } = this.modalService.data

    let filePath = ''
    if (this.router.url.includes('leadership-academy')) {
      filePath = `video-leadership-${title}-${conference.date}-${this.video.name}`
    } else if (this.router.url.includes('the-forum')) {
      filePath = `video-forum-${title}-${conference.date}-${this.video.name}`
    } else if (this.router.url.includes('pauline')) {
      filePath = `video-pauline-${title}-${conference.date}-${this.video.name}`
    }

    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, this.video);

    this.uploadPercent = task.percentageChanges()

    task.snapshotChanges().pipe(
      finalize(() => {
        this.downloadURL = fileRef.getDownloadURL()
        this.downloadURL.forEach(async (url: any) => {
          if (url) {
            const foundConference = country.conferences[country.conferences.findIndex((countryConference: any) => countryConference.date === conference.date)]
            foundConference.videos.push({ title, url })
            if (this.router.url.includes('leadership-academy')) {
              this.modalService.leadershipCountryChangedSubject.next(country)
              await this.firestoreService.updateData(country, 'leadership-academy-countries')
            } else if (this.router.url.includes('the-forum')) {
              this.modalService.forumCountryChangedSubject.next(country)
              await this.firestoreService.updateData(country, 'the-forum-countries')
            } else if (this.router.url.includes('pauline')) {
              await this.firestoreService.updateData(country, 'pauline-leadership-countries')
            }
          }
        })

        this.loading = false
        this.snackbarService.showSnackbar({ text: 'Video successfully uploaded!', success: true })
        this.modalService.closeModal()
      })
    ).subscribe()
  }

  addSessionVideo(): void {
    const { title } = this.addVideoForm.value
    const { session } = this.modalService.data

    let filePath = ''
    if (this.router.url.includes('leadership-academy')) {
      filePath = `video-leadership-${title}-${session.name}-${this.video.name}`
    } else if (this.router.url.includes('the-forum')) {
      filePath = `video-forum-${title}-${session.name}-${this.video.name}`
    } else if (this.router.url.includes('pauline')) {
      filePath = `video-pauline-${title}-${session.name}-${this.video.name}`
    }

    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, this.video);

    this.uploadPercent = task.percentageChanges()

    task.snapshotChanges().pipe(
      finalize(() => {
        this.downloadURL = fileRef.getDownloadURL()
        this.downloadURL.forEach(async (url: any) => {
          if (url) {
            session.videos.push({ title, url })
            if (this.router.url.includes('leadership-academy')) {
              this.modalService.leadershipSessionChangedSubject.next(session)
              await this.firestoreService.updateData(session, 'leadership-academy-sessions')
            } else if (this.router.url.includes('the-forum')) {
              this.modalService.forumSessionChangedSubject.next(session)
              await this.firestoreService.updateData(session, 'the-forum-sessions')
            } else if (this.router.url.includes('pauline')) {
              this.modalService.paulineSessionChangedSubject.next(session)
              await this.firestoreService.updateData(session, 'pauline-leadership-sessions')
            }
          }
        })

        this.loading = false
        this.snackbarService.showSnackbar({ text: 'Video successfully uploaded!', success: true })
        this.modalService.closeModal()
      })
    ).subscribe()
  }

  setVideo(event: any) {
    this.video = event.target.files[0]
  }
}
