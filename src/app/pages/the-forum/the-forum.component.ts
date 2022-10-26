import { Component, OnInit, } from '@angular/core';
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
  countries: Array<any> = []
  sessions: Array<any> = []

  constructor(
    private firestoreService: FirestoreService
  ) { }

  async ngOnInit(): Promise<void> {
    this.loading = true
    this.countries = await this.firestoreService.getData('the-forum-countries')
    this.loading = false
  }

  async setTab(tab: any): Promise<void> {
    this.tabSelected = tab
    if (tab.selector === 'sessions') {
      this.sessions = []
      this.loading = true
      this.sessions = await this.firestoreService.getData('the-forum-sessions')
      this.loading = false
    } else if (tab.selector === 'conferences') {
      this.countries = []
      this.loading = true
      this.countries = await this.firestoreService.getData('the-forum-countries')
      this.loading = false
    }
  }
}
