import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Session } from 'src/app/shared/models/conference';
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
    private modalService: ModalService,
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
}
