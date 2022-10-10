import { Component, OnInit } from '@angular/core';
import { QuerySnapshot } from 'firebase/firestore';
import { Application } from 'src/app/shared/models/application';
import { FirestoreService } from 'src/app/shared/services/firestore.service';

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

  constructor(private firestoreService: FirestoreService) { }

  ngOnInit(): void {
    this.loadingApplications = true

    this.firestoreService.getApplications().subscribe((res: QuerySnapshot) => {
      const applications: Array<Application> = [];

      res.docs.forEach((doc: any) => {
        const application = doc.data()
        application.id = doc.id
        applications.push(application)
      })

      this.applications = [...applications]
      this.loadingApplications = false
    })
  }
}
