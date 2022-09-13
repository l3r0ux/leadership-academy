import { Component, OnInit } from '@angular/core';
import { Session } from 'src/app/shared/models/session';
import { sessions } from 'src/app/shared/dummyData';

@Component({
  selector: 'app-pauline-leadership',
  templateUrl: './pauline-leadership.component.html',
  styleUrls: ['./pauline-leadership.component.scss']
})
export class PaulineLeadershipComponent implements OnInit {
  sessions: Array<Session> = sessions;

  constructor() { }

  ngOnInit(): void {
  }

}
