import { Component, OnInit } from '@angular/core';
import { Conference } from 'src/app/shared/models/conference';
import { conferences, sessions } from 'src/app/shared/dummyData';
import { Session } from 'src/app/shared/models/session';

@Component({
  selector: 'app-leadership-academy',
  templateUrl: './leadership-academy.component.html',
  styleUrls: ['./leadership-academy.component.scss']
})
export class LeadershipAcademyComponent implements OnInit {
  conferences: Array<Conference> = conferences;
  sessions: Array<Session> = sessions;
  tabSelected: any = {
    title: 'Conferences',
    selector: 'conferences',
    routerLink: undefined
  }
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
