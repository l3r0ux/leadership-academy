import { Component, OnInit } from '@angular/core';
import { Session } from 'src/app/shared/models/conference';
import { FirestoreService } from 'src/app/shared/services/firestore.service';
import { ModalService } from 'src/app/shared/services/modal.service';

@Component({
  selector: 'app-leadership-academy',
  templateUrl: './leadership-academy.component.html',
  styleUrls: ['./leadership-academy.component.scss']
})
export class LeadershipAcademyAdminComponent implements OnInit {
  tabSelected: any = {
    title: 'Conferences',
    selector: 'conferences',
    routerLink: undefined
  }
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

  async ngOnInit(): Promise<void> {
    this.loading = true
    this.countries = await this.firestoreService.getData('leadership-academy-countries')
    this.loading = false
  }

  async setTab(tab: any): Promise<void> {
    this.tabSelected = tab
    if (tab.selector === 'sessions') {
      this.sessions = []
      this.loading = true
      this.sessions = await this.firestoreService.getData('leadership-academy-sessions')
      this.loading = false
    } else if (tab.selector === 'conferences') {
      this.countries = []
      this.loading = true
      this.countries = await this.firestoreService.getData('leadership-academy-countries')
      this.loading = false
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
