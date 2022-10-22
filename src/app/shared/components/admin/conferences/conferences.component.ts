import { Component, Input, OnInit } from '@angular/core';
import { Conference } from 'src/app/shared/models/conference';
import { FirestoreService } from 'src/app/shared/services/firestore.service';
import { ModalService } from 'src/app/shared/services/modal.service';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';

@Component({
  selector: 'app-conferences',
  templateUrl: './conferences.component.html',
  styleUrls: ['./conferences.component.scss']
})
export class ConferencesAdminComponent implements OnInit {
  @Input() countries!: Array<any>
  loading = false

  constructor(
    public modalService: ModalService,
    private firestoreService: FirestoreService,
    private snackbarService: SnackbarService
  ) { }

  ngOnInit(): void {
  }

  async toggleLive(event: any, country: any, conference: any) {
    const foundConference = country.conferences[country.conferences.findIndex((countryConference: any) => countryConference.date === conference.date)]
    foundConference.isLive = event.target.checked

    this.loading = true
    try {
      await this.firestoreService.updateData(country, 'leadership-academy-countries')
      event.target.checked
      ? this.snackbarService.showSnackbar({ text: 'Conference is now live!', success: true })
      : this.snackbarService.showSnackbar({ text: 'Conference is now hidden!', success: true })
    } catch(error) {
      console.error(error)
      this.snackbarService.showSnackbar({ text: 'Something went wrong', success: false })
    }
    this.loading = false
  }
}
