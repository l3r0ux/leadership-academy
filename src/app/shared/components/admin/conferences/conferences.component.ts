import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
    private snackbarService: SnackbarService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  async toggleLive(event: any, country: any, conference: any) {
    const foundConference = country.conferences[country.conferences.findIndex((countryConference: any) => countryConference.date === conference.date)]
    foundConference.isLive = event.target.checked

    this.loading = true
    try {
      if (this.router.url.includes('leadership-academy')) {
        await this.firestoreService.updateData(country, 'leadership-academy-countries')
      } else if (this.router.url.includes('the-forum')) {
        await this.firestoreService.updateData(country, 'the-forum-countries')
      } else if (this.router.url.includes('pauline-leadership')) {
        await this.firestoreService.updateData(country, 'pauline-countries')
      }
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
