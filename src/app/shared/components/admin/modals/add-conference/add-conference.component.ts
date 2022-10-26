import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Timestamp } from 'firebase/firestore';
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
    private snackbarService: SnackbarService,
    private router: Router
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
      date: Timestamp.fromDate(new Date(this.addConferenceForm.value.date)),
      videos: [],
      teachingMaterials: [],
      galleryURLs: []
    })

    try {
      if (this.router.url.includes('leadership-academy')) {
        await this.firestoreService.updateData(country, 'leadership-academy-countries')
      } else if (this.router.url.includes('the-forum')) {
        await this.firestoreService.updateData(country, 'the-forum-countries')
      } else if (this.router.url.includes('pauline-leadership')) {
        await this.firestoreService.updateData(country, 'pauline-leadership-countries')
      }

      this.snackbarService.showSnackbar({ text: 'Conference succesfully added!', success: true })
    } catch (error) {
      console.error(error)
      this.snackbarService.showSnackbar({ text: 'Something went wrong.', success: false })
    }

    this.modalService.closeModal()
  }
}
