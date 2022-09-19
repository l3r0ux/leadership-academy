import { Component, OnInit, } from '@angular/core';
import { conferences, sessions } from 'src/app/shared/dummyData';
import { Conference } from 'src/app/shared/models/conference';
import { Session } from 'src/app/shared/models/session';

@Component({
  selector: 'app-the-forum',
  templateUrl: './the-forum.component.html',
  styleUrls: ['./the-forum.component.scss'],
})
export class TheForumComponent implements OnInit {
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
      title: 'Sessions',
      selector: 'sessions',
      routerLink: undefined
    }
  ]
  conferences: Array<Conference> = conferences
  sessions: Array<Session> = sessions

  constructor() { }

  ngOnInit(): void {
  }

  setTab(tab: any): void {
    this.tabSelected = tab
  }
}
