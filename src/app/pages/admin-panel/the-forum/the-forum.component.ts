import { Component, OnInit } from '@angular/core';
import { Conference, Session } from 'src/app/shared/models/conference';
import { conferences, sessions } from 'src/app/shared/dummyData';
import { ModalService } from 'src/app/shared/services/modal.service';

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
  conferences: Array<Conference> = conferences
  sessions: Array<Session> = sessions
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

  constructor(private modalService: ModalService) { }

  ngOnInit(): void {
  }

  setTab(tab: any): void {
    this.tabSelected = tab
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
        this.modalService.openModal('Add country')
        break
      case 'sessions':
        this.modalService.openModal('Add session')
        break
    }
  }
}
