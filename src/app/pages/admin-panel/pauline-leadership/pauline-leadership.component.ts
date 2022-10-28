import { Component, OnInit } from '@angular/core';
import { FirestoreService } from 'src/app/shared/services/firestore.service';
import { ModalService } from 'src/app/shared/services/modal.service';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';

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
  students: Array<any> = []

  loading = false

  tabs: Array<any> = [
    {
      title: 'Virtual sessions',
      selector: 'sessions',
      routerLink: undefined
    },
    {
      title: 'Pauline students',
      selector: 'students',
      routerLink: undefined
    }
  ]

  constructor(
    private modalService: ModalService,
    private firestoreService: FirestoreService,
    private snackbarService: SnackbarService
  ) { }

  async ngOnInit(): Promise<void> {
    this.loading = true
    this.sessions = await this.firestoreService.getSessionData('pauline-leadership-sessions')
    this.loading = false
  }

  async setTab(tab: any): Promise<void> {
    this.tabSelected = tab
    
    if (this.tabSelected.selector === 'sessions') {
      this.sessions = []
      this.loading = true
      try {
        this.sessions = await this.firestoreService.getSessionData('pauline-leadership-sessions')
      } catch (error) {
        console.error(error)
        this.snackbarService.showSnackbar({ text: 'Oops! Something went wrong', success: false })
      }
      this.loading = false
    } else if (this.tabSelected.selector === 'students') {
      this.students = []
      this.loading = true
      try {
        this.students = await this.firestoreService.getPaulineStudents()
      } catch (error) {
        console.error(error)
        this.snackbarService.showSnackbar({ text: 'Oops! Something went wrong', success: false })
      }
      this.loading = false
    }
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

  sessionsLoaded(sessions: Array<any>): void {
    this.sessions = [...sessions]
  }

  moreSessionsLoaded(sessions: Array<any>): void {
    sessions.forEach((session: any) => {
      this.sessions.push(session)
    })
  }

  studentsLoaded(students: Array<any>): void {
    this.students = [...students]
  }

  moreStudentsLoaded(students: Array<any>): void {
    students.forEach((student: any) => {
      this.students.push(student)
    })
  }
}
