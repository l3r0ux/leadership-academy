import { Component, OnInit } from '@angular/core';
import { Session } from 'src/app/shared/models/session';
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

  async ngOnInit(): Promise<void> {
    this.loading = true
    this.sessions = await this.firestoreService.getData('pauline-leadership-sessions')
    this.loading = false
  }

  setTab(tab: any): void {
    this.tabSelected = tab
  }
}
