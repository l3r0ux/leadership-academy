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

  async delete() {
    const { resource, country, conference, data } = this.modalService.data
    console.log(this.modalService.data)

    this.loading = true

    try {
      if (this.router.url.includes('leadership-academy')) {
        switch (resource) {
          case 'country':
            await this.deleteCountry(country)
            break;
          case 'conference':
            await this.deleteConference(country, conference)
            break;
          case 'videos':
            await this.deleteResource(country, conference, data, 'videos')
            break;
          case 'teaching material':
            await this.deleteResource(country, conference, data, 'teaching material')
            break;
          case 'image':
            await this.deleteResource(country, conference, data, 'image')
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

  async deleteCountry(country: any): Promise<void> {
    for(const conference of country.conferences) {
      await this.deleteResources(conference)
    }
    await this.firestoreService.deleteData(country, 'leadership-academy-countries')
  }
  
  async deleteConference(country: any, conference: any): Promise<void> {
    const foundConference = country.conferences[country.conferences.findIndex((existingConference: any) => existingConference.date === conference.date)]
    await this.deleteResources(foundConference)
    country.conferences.splice(country.conferences.findIndex((existingConference: any) => existingConference.date === conference.date), 1)
    await this.firestoreService.updateData(country, 'leadership-academy-countries')
  }

  async deleteResource(country: any, conference: any, data: any, resource: string): Promise<void> {
    console.log(data)
    const foundConference = country.conferences[country.conferences.findIndex((existingConference: any) => existingConference.date === conference.date)]

    const fileRef = this.storage.refFromURL(data.url);
    await fileRef.delete().toPromise()

    if (foundConference) {
      switch(resource) {
        case 'videos':
          conference.videos.splice(foundConference.videos.findIndex(((video: any) => video.title === data.title)), 1)
          break;
        case 'teaching material':
          conference.teachingMaterials.splice(foundConference.teachingMaterials.findIndex(((material: any) => material.title === data.title)), 1)
          break;
        case 'image':
          conference.galleryURLs.splice(foundConference.galleryURLs.findIndex(((url: any) => url === data)), 1)
          break;
      }
    }
    await this.firestoreService.updateData(country, 'leadership-academy-countries')
  }

  async deleteResources(foundConference: any): Promise<any> {
    const resourcesToDelete = []

    for (const image of foundConference.galleryURLs) {
      resourcesToDelete.push(image)
    }
    for (const teachingMaterial of foundConference.teachingMaterials) {
      resourcesToDelete.push(teachingMaterial.url)
    }
    for (const video of foundConference.videos) {
      resourcesToDelete.push(video.url)
    }

    for (const resource of resourcesToDelete) {
      const fileRef = this.storage.refFromURL(resource);
      await fileRef.delete().toPromise()
    }
  }
}
