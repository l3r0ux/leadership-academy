import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FirestoreService } from 'src/app/shared/services/firestore.service';
import { ModalService } from 'src/app/shared/services/modal.service';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';

@Component({
  selector: 'app-edit-video',
  templateUrl: './edit-video.component.html',
  styleUrls: ['./edit-video.component.scss']
})
export class EditVideoComponent implements OnInit {
  editVideoForm!: FormGroup
  loading = false

  constructor(
    public modalService: ModalService,
    private firestoreService: FirestoreService,
    private snackbarService: SnackbarService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.editVideoForm = new FormGroup({
      'title': new FormControl(null, [Validators.required])
    })
  }

  onSubmit(): void {
    if (this.loading) return
    this.editVideoForm.markAllAsTouched()
    if (!this.editVideoForm.valid) return
    this.loading = true

    if (this.modalService.data.session) {
      this.editSessionVideo()
    } else {
      this.editConferenceVideo()
    }
  }

  async editConferenceVideo(): Promise<void> {
    const { title } = this.editVideoForm.value
    const { country, conference, data } = this.modalService.data

    const video = conference.videos[conference.videos.indexOf(data)]
    video.title = title

    if (this.router.url.includes('leadership-academy')) {
      this.modalService.leadershipCountryChangedSubject.next(country)
      await this.firestoreService.updateData(country, 'leadership-academy-countries')
    } else if (this.router.url.includes('the-forum')) {
      this.modalService.forumCountryChangedSubject.next(country)
      await this.firestoreService.updateData(country, 'the-forum-countries')
    } else if (this.router.url.includes('pauline')) {
      await this.firestoreService.updateData(country, 'pauline-leadership-countries')
    }

    this.loading = false
    this.snackbarService.showSnackbar({ text: 'Video title edited!', success: true })
    this.modalService.closeModal()
  }

  async editSessionVideo(): Promise<void> {
    const { title } = this.editVideoForm.value
    const { session, data } = this.modalService.data

    const video = session.videos[session.videos.indexOf(data)]
    video.title = title

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

    this.loading = false
    this.snackbarService.showSnackbar({ text: 'Video title edited!', success: true })
    this.modalService.closeModal()
  }
}
