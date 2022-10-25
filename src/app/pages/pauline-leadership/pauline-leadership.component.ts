import { Component, OnInit } from '@angular/core';
import { Session } from 'src/app/shared/models/session';
import { Subscription } from 'rxjs';
import { FirestoreService } from 'src/app/shared/services/firestore.service';

@Component({
  selector: 'app-pauline-leadership',
  templateUrl: './pauline-leadership.component.html',
  styleUrls: ['./pauline-leadership.component.scss']
})
export class PaulineLeadershipComponent implements OnInit {
  tabSelected: any = {
    title: 'Virtual sessions',
    selector: 'sessions',
    routerLink: undefined
  }
  sessionsSub!: Subscription
  sessions: Array<Session> = []

  loading = false

  tabs: Array<any> = [
    {
      title: 'Virtual sessions',
      selector: 'sessions',
      routerLink: undefined
    }
  ]

  constructor(
    private firestoreService: FirestoreService
  ) { }

  ngOnInit(): void {
    this.loading = true
    this.sessionsSub = this.firestoreService.getData('pauline-leadership-sessions').subscribe((sessions: any) => {
      this.sessions = sessions
      this.loading = false
    })
  }

  setTab(tab: any): void {
    this.tabSelected = tab
  }
}
