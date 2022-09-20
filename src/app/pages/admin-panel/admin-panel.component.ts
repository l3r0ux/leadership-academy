import { Component, OnInit } from '@angular/core';
import { applications } from 'src/app/shared/dummyData';
import { Application } from 'src/app/shared/models/application';

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
  applications: Array<Application> = applications;

  constructor() { }

  ngOnInit(): void {
  }
}
