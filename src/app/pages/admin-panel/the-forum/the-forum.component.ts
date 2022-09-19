import { Component, OnInit } from '@angular/core';
import { Conference, Session } from 'src/app/shared/models/conference';
import { conferences, sessions } from 'src/app/shared/dummyData';

@Component({
  selector: 'app-the-forum',
  templateUrl: './the-forum.component.html',
  styleUrls: ['./the-forum.component.scss']
})
export class TheForumAdminComponent implements OnInit {
  conferences: Array<Conference> = conferences
  sessions: Array<Session> = sessions
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

  constructor() { }

  ngOnInit(): void {
  }
}
