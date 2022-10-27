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
  @Output() sessionsLoaded = new EventEmitter<Array<any>>();
  loading = false
  isLoadingMore = false
  limit = 5
  isAllSessions = false
  
  constructor(public modalService: ModalService,
    private firestoreService: FirestoreService,
    private snackbarService: SnackbarService,
    private router: Router
  ) { }

  async ngOnInit(): Promise<void> {
    if (this.router.url.includes('leadership-academy')) {
      await this.checkCanLoadMore('leadership-academy-sessions')
    } else if (this.router.url.includes('the-forum')) {
      await this.checkCanLoadMore('the-forum-sessions')
    } else if (this.router.url.includes('pauline-leadership')) {
      await this.checkCanLoadMore('pauline-leadership-sessions')
    }

    this.modalService.paulineSessionChangedSubject.subscribe(async () => {
      await this.fetchNewPaulineSessions()
    })

    this.modalService.leadershipSessionChangedSubject.subscribe(async () => {
      await this.fetchNewAcademySessions()
    })

    this.modalService.forumSessionChangedSubject.subscribe(async () => {
      await this.fetchNewForumSessions()
    })
  }

  async loadMore(): Promise<void> {
    this.isLoadingMore = true
    this.limit += 5
    try {
      if (this.router.url.includes('leadership-academy')) {
        await this.loadNextSessions('leadership-academy-sessions')
      } else if (this.router.url.includes('the-forum')) {
        await this.loadNextSessions('the-forum-sessions')
      } else if (this.router.url.includes('pauline-leadership')) {
        await this.loadNextSessions('pauline-leadership-sessions')
      }
    } catch (error: any) {
      console.error(error)
      this.snackbarService.showSnackbar({ text: 'Something went wrong', success: false })
    }
    this.isLoadingMore = false
  }

  async loadNextSessions(collection: string): Promise<void> {
    const nextSessions = await this.firestoreService.loadMoreSessions(collection, this.sessions[this.sessions.length - 1].date)
    const lastDoc: any = await this.firestoreService.getLastSession(collection)

    this.moreLoaded.emit(nextSessions)
    if (nextSessions[nextSessions.length - 1].id === lastDoc.id) {
      this.isAllSessions = true
    }
  }

  async checkCanLoadMore(collection: string): Promise<void> {
    const lastDoc: any = await this.firestoreService.getLastSession(collection)

    if (this.sessions[this.sessions.length - 1]?.id === lastDoc?.id) {
      this.isAllSessions = true
    } else {
      this.isAllSessions = false
    }
  }

  async fetchNewPaulineSessions(): Promise<void> {
    const sessions = await this.firestoreService.getSessionData('pauline-leadership-sessions', this.limit)
    this.sessionsLoaded.emit(sessions)
    await this.checkCanLoadMore('pauline-leadership-sessions')
  }

  async fetchNewAcademySessions(): Promise<void> {
    const sessions = await this.firestoreService.getSessionData('leadership-academy-sessions', this.limit)
    this.sessionsLoaded.emit(sessions)
    await this.checkCanLoadMore('leadership-academy-sessions')
  }

  async fetchNewForumSessions(): Promise<void> {
    const sessions = await this.firestoreService.getSessionData('the-forum-sessions', this.limit)
    this.sessionsLoaded.emit(sessions)
    await this.checkCanLoadMore('the-forum-sessions')
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
