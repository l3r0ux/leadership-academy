import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FirestoreService } from 'src/app/shared/services/firestore.service';
import { ModalService } from 'src/app/shared/services/modal.service';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';

@Component({
  selector: 'app-add-country',
  templateUrl: './add-country.component.html',
  styleUrls: ['./add-country.component.scss']
})
export class AddCountryComponent implements OnInit {
  loading = false
  addCountryForm!: FormGroup;

  constructor(
    public modalService: ModalService,
    private firestoreService: FirestoreService,
    private snackbarService: SnackbarService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.addCountryForm = new FormGroup({
      'country': new FormControl(null, [Validators.required])
    })
  }

  async onSubmit(): Promise<void> {
    this.addCountryForm.markAllAsTouched()
    if (!this.addCountryForm.valid) return

    let foundCountry = 
    this.modalService.data[this.modalService.data.findIndex((country: any) => country.country === this.addCountryForm.value.country)]

    if (foundCountry) {
      this.addCountryForm.controls['country'].setErrors({ exists: true })
      return
    }
    
    let country = {
      country: this.addCountryForm.value.country,
      conferences: []
    }

    this.loading = true

    try {
      if (this.router.url.includes('leadership-academy')) {
        await this.firestoreService.addData(country, 'leadership-academy-countries')
        this.modalService.leadershipCountryChangedSubject.next(country)
      } else if (this.router.url.includes('the-forum')) {
        await this.firestoreService.addData(country, 'the-forum-countries')
        this.modalService.forumCountryChangedSubject.next(country)
      }
      this.snackbarService.showSnackbar({ text: 'Country succesfully added!', success: true })
    } catch (error) {
      console.error(error)
      this.snackbarService.showSnackbar({ text: 'Something went wrong.', success: false })
    }

    this.loading = false
    this.modalService.closeModal()
  }
}

