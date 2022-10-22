import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FirestoreService } from 'src/app/shared/services/firestore.service';
import { ModalService } from 'src/app/shared/services/modal.service';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';

@Component({
  selector: 'app-delete-confirmation',
  templateUrl: './delete-confirmation.component.html',
  styleUrls: ['./delete-confirmation.component.scss']
})
export class DeleteConfirmationComponent implements OnInit {
  loading = false

  constructor(
    public modalService: ModalService,
    private router: Router,
    private firestoreService: FirestoreService,
    private snackbarService: SnackbarService
  ) { }

  ngOnInit(): void {
  }

  async deleteResource() {
    const { resource, country, conference } = this.modalService.data

    this.loading = true

    try {
      if (this.router.url.includes('leadership-academy')) {
        if (resource === 'country') {
          await this.firestoreService.deleteLeadershipAcademyCountry(this.modalService.data.country)
        } else if (resource === 'conference') {
          const conferenceIndex = country.conferences.findIndex((existingConference: any) => existingConference.date === conference.date)
          country.conferences.splice(conferenceIndex, 1)
          await this.firestoreService.deleteLeadershipAcademyConference(this.modalService.data.country)
        }
      }

      this.snackbarService.showSnackbar({ text: 'Resource successfully deleted!', success: true })
    } catch (error) {
      console.error(error)
      this.snackbarService.showSnackbar({ text: 'Something went wrong.', success: false })
    }

    this.loading = false
    this.modalService.closeModal()
  }
}
