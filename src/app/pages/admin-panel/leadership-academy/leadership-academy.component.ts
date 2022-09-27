import { Component, OnInit } from '@angular/core';
import { Conference, Session } from 'src/app/shared/models/conference';
import { conferences, sessions } from 'src/app/shared/dummyData';

@Component({
  selector: 'app-leadership-academy',
  templateUrl: './leadership-academy.component.html',
  styleUrls: ['./leadership-academy.component.scss']
})
export class LeadershipAcademyAdminComponent implements OnInit {
  tabSelected: any = {
    title: 'Conferences',
    selector: 'conferences',
    routerLink: undefined
  }
  conferences: Array<Conference> = conferences
  sessions: Array<Session> = sessions
  tabs: Array<any> = [
    {
      title: 'Conferences',
      selector: 'conferences',
      routerLink: undefined
    },
    {
      title: 'Virtual sessions',
      selector: 'sessions',
      routerLink: undefined
    }
  ]

  constructor() { }

  ngOnInit(): void {
  }

  setTab(tab: any): void {
    this.tabSelected = tab
  }
}
