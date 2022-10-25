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
    const {
      resource,
      country,
      conference,
      data,
      session,
      sessions } = this.modalService.data
    this.loading = true

    try {
      if (this.router.url.includes('leadership-academy')) {
        switch (resource) {
          case 'session':
            await this.deleteSession(sessions, session)
            break;
          case 'country':
            await this.deleteCountry(country)
            break;
          case 'conference':
            await this.deleteConference(country, conference)
            break;
          case 'videos':
            await this.deleteResource(country, conference, data, session, 'videos')
            break;
          case 'teaching material':
            await this.deleteResource(country, conference, data, session, 'teaching material')
            break;
          case 'image':
            await this.deleteResource(country, conference, data, session, 'image')
            break;
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

  async deleteSession(sessions: any, session: any): Promise<void> {
    const foundSession = sessions.filter((sessionI: any) => sessionI.name === session.name)
    await this.deleteResources({ foundSession: session })
    console.log(foundSession[0])
    await this.firestoreService.deleteData(foundSession[0], 'leadership-academy-sessions')
  }

  async deleteCountry(country: any): Promise<void> {
    for(const conference of country.conferences) {
      await this.deleteResources({ foundConference: conference })
    }
    await this.firestoreService.deleteData(country, 'leadership-academy-countries')
  }
  
  async deleteConference(country: any, conference: any): Promise<void> {
    const foundConference = country.conferences[country.conferences.findIndex((existingConference: any) => existingConference.date === conference.date)]
    await this.deleteResources({ foundConference })
    country.conferences.splice(country.conferences.findIndex((existingConference: any) => existingConference.date === conference.date), 1)
    await this.firestoreService.updateData(country, 'leadership-academy-countries')
  }

  async deleteResource(country: any, conference: any, data: any, session: any, resource: string): Promise<void> {
    console.warn(data)
    if (session) {
      await this.deleteSessionResource(session, data, resource)
    } else {
      await this.deleteConferenceResource(country, conference, data, resource)
    }
  }

  async deleteSessionResource(session: any, data: any, resource: string): Promise<void> {
    console.warn(data)
    const fileRef = this.storage.refFromURL(data.url);
    await fileRef.delete().toPromise()

    switch(resource) {
      case 'videos':
        session.videos.splice(session.videos.findIndex(((video: any) => video.title === data.title)), 1)
        break;
      case 'teaching material':
        session.teachingMaterials.splice(session.teachingMaterials.findIndex(((material: any) => material.title === data.title)), 1)
        break;
      case 'image':
        session.galleryURLs.splice(session.galleryURLs.findIndex(((url: any) => url === data)), 1)
        break;
    }
    await this.firestoreService.updateData(session, 'leadership-academy-sessions')
  }

  async deleteConferenceResource(country: any, conference: any, data: any, resource: string): Promise<void> {
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

  async deleteResources({ foundConference, foundSession }: any = {}): Promise<any> {
    const resourcesToDelete = []

    if (foundSession) {
      for (const image of foundSession.galleryURLs) {
        resourcesToDelete.push(image)
      }
      for (const teachingMaterial of foundSession.teachingMaterials) {
        resourcesToDelete.push(teachingMaterial.url)
      }
      for (const video of foundSession.videos) {
        resourcesToDelete.push(video.url)
      }
    } else if (foundConference) {
      for (const image of foundConference.galleryURLs) {
        resourcesToDelete.push(image)
      }
      for (const teachingMaterial of foundConference.teachingMaterials) {
        resourcesToDelete.push(teachingMaterial.url)
      }
      for (const video of foundConference.videos) {
        resourcesToDelete.push(video.url)
      }
    }

    for (const resource of resourcesToDelete) {
      const fileRef = this.storage.refFromURL(resource);
      await fileRef.delete().toPromise()
    }
  }
}
