import { Component, OnInit } from '@angular/core';
import { FirestoreService } from 'src/app/shared/services/firestore.service';
import { ModalService } from 'src/app/shared/services/modal.service';

@Component({
  selector: 'app-pauline-leadership',
  templateUrl: './pauline-leadership.component.html',
  styleUrls: ['./pauline-leadership.component.scss']
})
export class PaulineLeadershipAdminComponent implements OnInit {
  tabSelected: any = {
    title: 'Virtual sessions',
    selector: 'sessions',
    routerLink: undefined
  }
  sessions: Array<any> = []

  loading = false

  tabs: Array<any> = [
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
    this.sessions = await this.firestoreService.getData('pauline-leadership-sessions')
    this.loading = false
  }

  setTab(tab: any): void {
    this.tabSelected = tab
  }

  displayAddText(): string {
    switch(this.tabSelected.selector) {
      case 'sessions':
        return 'Add session'
      default:
        return 'Add'
    }
  }

  openAddResource(): void {
    switch(this.tabSelected.selector) {
      case 'sessions':
        this.modalService.openModal('Add session', this.sessions)
        break
    }
  }

  addMoreLoaded(sessions: Array<any>): void {
    sessions.forEach((session: any) => {
      this.sessions.push(session)
    })
  }
}
