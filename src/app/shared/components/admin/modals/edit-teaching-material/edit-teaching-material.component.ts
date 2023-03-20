import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
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
  @ViewChild('input', {static: true}) input!: ElementRef;
  loading = false

  constructor(
    public modalService: ModalService,
    private firestoreService: FirestoreService,
    private snackbarService: SnackbarService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.editTeachingMaterialForm = new FormGroup({
      'title': new FormControl(null, [Validators.required]),
      'sortOrder': new FormControl(null, [Validators.required]),
    })
    this.editTeachingMaterialForm.controls['title'].setValue(this.modalService.data?.data?.title)
    this.editTeachingMaterialForm.controls['sortOrder'].setValue(this.modalService.data?.data?.sortOrder)
    this.input.nativeElement.focus()
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
    const { title, sortOrder } = this.editTeachingMaterialForm.value
    const country = { ...this.modalService.data.country }
    const conference = { ...this.modalService.data.conference }
    const teachingMaterial = { ...this.modalService.data.data }

    const materials = [...conference.teachingMaterials]
    const toRemoveIndex = materials.findIndex((m) => m.title === teachingMaterial.title)
    const toMove = materials.splice(toRemoveIndex, 1)
    materials.splice(sortOrder - 1, 0, toMove[0])
    materials.forEach((m: any, i: number): void => {
      m.sortOrder = i + 1
    })
    toMove[0].title = title
    conference.teachingMaterials = [...materials]

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
    this.snackbarService.showSnackbar({ text: 'Material edited!', success: true })
    this.modalService.closeModal()
  }

  async editSessionTeachingMaterial(): Promise<void> {
    const { title, sortOrder } = this.editTeachingMaterialForm.value
    const session = { ...this.modalService.data.session }
    const teachingMaterial = { ...this.modalService.data.data }

    const materials = [...session.teachingMaterials]
    const toRemoveIndex = materials.findIndex((m) => m.title === teachingMaterial.title)
    const toMove = materials.splice(toRemoveIndex, 1)
    materials.splice(sortOrder - 1, 0, toMove[0])
    materials.forEach((m: any, i: number): void => {
      m.sortOrder = i + 1
    })
    toMove[0].title = title
    session.teachingMaterials = [...materials]

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
    this.snackbarService.showSnackbar({ text: 'Material edited!', success: true })
    this.modalService.closeModal()
  }
}
