import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FirestoreService } from 'src/app/shared/services/firestore.service';
import { ModalService } from 'src/app/shared/services/modal.service';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';

@Component({
  selector: 'app-add-conference',
  templateUrl: './add-conference.component.html',
  styleUrls: ['./add-conference.component.scss']
})
export class AddConferenceComponent implements OnInit {
  loading = false
  addConferenceForm!: FormGroup;

  constructor(
    public modalService: ModalService,
    private firestoreService: FirestoreService,
    private snackbarService: SnackbarService
  ) { }

  ngOnInit(): void {
    this.addConferenceForm = new FormGroup({
      'date': new FormControl(null, [Validators.required])
    })
  }

  async onSubmit(): Promise<void> {
    this.addConferenceForm.markAllAsTouched()
    if (!this.addConferenceForm.valid) return

    this.loading = true

    let country = this.modalService.data

    country.conferences.push({
      isLive: false,
      date: this.addConferenceForm.value.date,
      videos: [],
      teachingMaterials: [],
      galleryURLs: []
    })

    try {
      await this.firestoreService.updateData(country, 'leadership-academy-countries')

      this.snackbarService.showSnackbar({ text: 'Conference succesfully added!', success: true })
    } catch (error) {
      console.error(error)
      this.snackbarService.showSnackbar({ text: 'Something went wrong.', success: false })
    }

    this.modalService.closeModal()
  }
}
