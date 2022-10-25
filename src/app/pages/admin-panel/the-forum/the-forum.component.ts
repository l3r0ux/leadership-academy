import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ModalService } from 'src/app/shared/services/modal.service';
import { FirestoreService } from 'src/app/shared/services/firestore.service';
import { Session } from 'src/app/shared/models/conference';

@Component({
  selector: 'app-the-forum',
  templateUrl: './the-forum.component.html',
  styleUrls: ['./the-forum.component.scss']
})
export class TheForumAdminComponent implements OnInit {
  tabSelected: any = {
    title: 'Conferences',
    selector: 'conferences',
    routerLink: undefined
  }
  conferencesSub!: Subscription
  sessionsSub!: Subscription
  countries: Array<any> = []
  sessions: Array<Session> = []

  loading = false

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

  constructor(
    private modalService: ModalService,
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

  displayAddText(): string {
    switch(this.tabSelected.selector) {
      case 'conferences':
        return 'Add country'
      case 'sessions':
        return 'Add session'
      default:
        return 'Add'
    }
  }

  openAddResource(): void {
    switch(this.tabSelected.selector) {
      case 'conferences':
        this.modalService.openModal('Add country', this.countries)
        break
      case 'sessions':
        this.modalService.openModal('Add session', this.sessions)
        break
    }
  }
}
