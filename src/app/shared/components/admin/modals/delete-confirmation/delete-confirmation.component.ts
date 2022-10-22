import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FirestoreService } from 'src/app/shared/services/firestore.service';
import { ModalService } from 'src/app/shared/services/modal.service';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';
import { AngularFireStorage } from '@angular/fire/compat/storage';

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
    private snackbarService: SnackbarService,
    private storage: AngularFireStorage
  ) { }

  ngOnInit(): void {
  }

  async deleteResource() {
    const { resource, country, conference, property } = this.modalService.data

    this.loading = true

    try {
      if (this.router.url.includes('leadership-academy')) {
        switch (resource) {
          case 'country':
            await this.firestoreService.deleteData(this.modalService.data.country, 'leadership-academy-countries')
            break;
          case 'conference':
            this.deleteConference(country, conference,)
            break;
          case 'video':
            await this.deleteVideo(country, conference, property)
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

  async deleteConference(country: any, conference: any): Promise<void> {
    const conferenceIndex = country.conferences.findIndex((existingConference: any) => existingConference.date === conference.date)
    country.conferences.splice(conferenceIndex, 1)
    await this.firestoreService.updateData(this.modalService.data.country, 'leadership-academy-countries')
  }

  async deleteVideo(country: any, conference: any, property: any): Promise<void> {
    const foundConference = country.conferences[country.conferences.findIndex((existingConference: any) => existingConference.date === conference.date)]
  
    const fileRef = this.storage.refFromURL(property.url);
    await fileRef.delete().toPromise()
  
    if (foundConference) {
      conference.videos.splice(foundConference.videos.findIndex(((video: any) => video.title === property.title)), 1)
    }
    await this.firestoreService.setObj(country)
  }
}
