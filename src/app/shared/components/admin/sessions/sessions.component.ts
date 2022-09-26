import { Component, OnInit } from '@angular/core';
import { sessions } from 'src/app/shared/dummyData';
import { Session } from 'src/app/shared/models/session';

@Component({
  selector: 'app-sessions',
  templateUrl: './sessions.component.html',
  styleUrls: ['./sessions.component.scss']
})
export class SessionsAdminComponent implements OnInit {
  sessions: Array<Session> = sessions

  constructor() { }

  ngOnInit(): void {
  }

}
