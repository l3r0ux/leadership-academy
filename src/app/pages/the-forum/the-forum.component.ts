import { Component, OnInit, } from '@angular/core';
import { Subscription } from 'rxjs';
import { FirestoreService } from 'src/app/shared/services/firestore.service';

@Component({
  selector: 'app-the-forum',
  templateUrl: './the-forum.component.html',
  styleUrls: ['./the-forum.component.scss'],
})
export class TheForumComponent implements OnInit {
  loading = false
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
  conferencesSub!: Subscription
  sessionsSub!: Subscription
  countries: Array<any> = []
  sessions: Array<any> = []

  constructor(
    private firestoreService: FirestoreService
  ) { }

  ngOnInit(): void {
    this.loading = true
    this.conferencesSub = this.firestoreService.getData('the-forum-countries').subscribe((countries: any) => {
      this.countries = countries
      this.loading = false
    })
  }

  setTab(tab: any): void {
    this.tabSelected = tab
    if (tab.selector === 'sessions') {
      this.conferencesSub.unsubscribe()
      this.sessions = []
      this.loading = true
      this.sessionsSub = this.firestoreService.getData('the-forum-sessions').subscribe((sessions: any) => {
        this.sessions = sessions
        this.loading = false
      })
    } else if (tab.selector === 'conferences') {
      this.sessionsSub.unsubscribe()
      this.countries = []
      this.loading = true
      this.conferencesSub = this.firestoreService.getData('the-forum-countries').subscribe((countries: any) => {
        this.countries = countries
        this.loading = false
      })
    }
  }
}
