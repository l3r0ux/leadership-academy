import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FirestoreService } from 'src/app/shared/services/firestore.service';
import { ModalService } from 'src/app/shared/services/modal.service';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';

@Component({
  selector: 'app-edit-teaching-material',
  templateUrl: './edit-teaching-material.component.html',
  styleUrls: ['./edit-teaching-material.component.scss']
})
export class EditTeachingMaterialComponent implements OnInit {
  editTeachingMaterialForm!: FormGroup
  loading = false

  constructor(
    public modalService: ModalService,
    private firestoreService: FirestoreService,
    private snackbarService: SnackbarService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.editTeachingMaterialForm = new FormGroup({
      'title': new FormControl(null, [Validators.required])
    })
  }

  onSubmit(): void {
    if (this.loading) return
    this.editTeachingMaterialForm.markAllAsTouched()
    if (!this.editTeachingMaterialForm.valid) return
    this.loading = true

    if (this.modalService.data.session) {
      this.editSessionTeachingMaterial()
    } else {
      this.editConferenceTeachingMaterial()
    }
  }

  async editConferenceTeachingMaterial(): Promise<void> {
    const { title } = this.editTeachingMaterialForm.value
    const { country, conference, data } = this.modalService.data

    console.log(this.modalService.data)

    const teachingMaterial = conference.teachingMaterials[conference.teachingMaterials.indexOf(data)]
    teachingMaterial.title = title

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
    this.snackbarService.showSnackbar({ text: 'Material title edited!', success: true })
    this.modalService.closeModal()
  }

  async editSessionTeachingMaterial(): Promise<void> {
    const { title } = this.editTeachingMaterialForm.value
    const { session, data } = this.modalService.data

    const teachingMaterial = session.teachingMaterials[session.teachingMaterials.indexOf(data)]
    teachingMaterial.title = title

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
    this.snackbarService.showSnackbar({ text: 'Material title edited!', success: true })
    this.modalService.closeModal()
  }
}
