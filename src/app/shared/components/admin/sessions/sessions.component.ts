import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { FirestoreService } from 'src/app/shared/services/firestore.service';
import { ModalService } from 'src/app/shared/services/modal.service';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';

@Component({
  selector: 'app-sessions',
  templateUrl: './sessions.component.html',
  styleUrls: ['./sessions.component.scss']
})
export class SessionsAdminComponent implements OnInit {
  @Input() sessions!: Array<any>
  @Output() moreLoaded = new EventEmitter<Array<any>>();
  loading = false
  isLoadingMore = false
  
  constructor(public modalService: ModalService,
    private firestoreService: FirestoreService,
    private snackbarService: SnackbarService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.modalService.paulineSessionAddedSubject.subscribe((session: any) => {
      this.sessions.push(session)
    })
    this.modalService.paulineSessionUpdatedSubject.subscribe((session: any) => {
      let foundSessionIndex = this.sessions.findIndex((sessionI: any) => sessionI.id === session.id)
      this.sessions[foundSessionIndex] = {...session}
    })
    this.modalService.paulineSessionDeletedSubject.subscribe((session: any) => {
      this.sessions = this.sessions.filter((sessionI: any) => sessionI.id !== session.id)
    })

    this.modalService.leadershipSessionAddedSubject.subscribe((session: any) => {
      this.sessions.push(session)
    })
    this.modalService.leadershipSessionUpdatedSubject.subscribe((session: any) => {
      let foundSessionIndex = this.sessions.findIndex((sessionI: any) => sessionI.id === session.id)
      this.sessions[foundSessionIndex] = {...session}
    })
    this.modalService.leadershipSessionDeletedSubject.subscribe((session: any) => {
      this.sessions = this.sessions.filter((sessionI: any) => sessionI.id !== session.id)
    })

    this.modalService.forumSessionAddedSubject.subscribe((session: any) => {
      this.sessions.push(session)
    })
    this.modalService.forumSessionUpdatedSubject.subscribe((session: any) => {
      let foundSessionIndex = this.sessions.findIndex((sessionI: any) => sessionI.id === session.id)
      this.sessions[foundSessionIndex] = {...session}
    })
    this.modalService.forumSessionDeletedSubject.subscribe((session: any) => {
      this.sessions = this.sessions.filter((sessionI: any) => sessionI.id !== session.id)
    })
  }

  async loadMore(): Promise<void> {
    this.isLoadingMore = true
    try {
      if (this.router.url.includes('leadership-academy')) {
        // await this.firestoreService.loadMoreSessions('leadership-academy-sessions', this.sessions[this.sessions.length - 1])
      } else if (this.router.url.includes('the-forum')) {
        // await this.firestoreService.loadMoreSessions('the-forum-sessions', this.sessions[this.sessions.length - 1])
      } else if (this.router.url.includes('pauline-leadership')) {
        const nextSessions = await this.firestoreService.loadMoreSessions('pauline-leadership-sessions', this.sessions[this.sessions.length - 1].date)
        this.moreLoaded.emit(nextSessions)
      }
    } catch (error: any) {
      console.error(error)
      this.snackbarService.showSnackbar({ text: 'Something went wrong', success: false })
    }
    this.isLoadingMore = false
  }

  async toggleLive(event: any, session: any) {
    const foundSession = this.sessions[this.sessions.findIndex((sessionI: any) => sessionI.name === session.name)]
    foundSession.isLive = event.target.checked

    this.loading = true
    try {
      if (this.router.url.includes('leadership-academy')) {
        await this.firestoreService.updateData(foundSession, 'leadership-academy-sessions')
      } else if (this.router.url.includes('the-forum')) {
        await this.firestoreService.updateData(foundSession, 'the-forum-sessions')
      } else if (this.router.url.includes('pauline-leadership')) {
        await this.firestoreService.updateData(foundSession, 'pauline-leadership-sessions')
      }
      event.target.checked
      ? this.snackbarService.showSnackbar({ text: 'Conference is now live!', success: true })
      : this.snackbarService.showSnackbar({ text: 'Conference is now hidden!', success: true })
    } catch(error) {
      console.error(error)
      this.snackbarService.showSnackbar({ text: 'Something went wrong', success: false })
    }
    this.loading = false
  }
}
