import { Component, OnInit } from '@angular/core';
import { Application } from 'src/app/shared/models/application';
import { FirestoreService } from 'src/app/shared/services/firestore.service';
import { ModalService } from 'src/app/shared/services/modal.service';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.scss']
})
export class AdminPanelComponent implements OnInit {
  tabs: Array<any> = [
    {
      title: 'The Forum',
      selector: 'the-forum',
      routerLink: 'the-forum'
    },
    {
      title: 'FEBC Intl. Leadership Academy',
      selector: 'leadership-academy',
      routerLink: 'leadership-academy'
    },
    {
      title: 'Pauline Leadership Training',
      selector: 'pauline-leadership',
      routerLink: 'pauline-leadership'
    }
  ]
  applications!: Array<Application>;
  loadingApplications = false

  constructor(
    private firestoreService: FirestoreService,
    private modalService: ModalService
  ) { }

  async ngOnInit(): Promise<void> {
    this.loadingApplications = true

    this.applications = await this.firestoreService.getApplications()
    this.loadingApplications = false

    this.modalService.applicationDeletedSubject.subscribe((application: any) => {
      this.applications = this.applications.filter((applicationI: any) => applicationI.id !== application.id)
    })
  }
}
