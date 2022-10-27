import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { FirestoreService } from '../../services/firestore.service';
import { SnackbarService } from '../../services/snackbar.service';

@Component({
  selector: 'app-session',
  templateUrl: './session.component.html',
  styleUrls: ['./session.component.scss']
})
export class SessionComponent implements OnInit {
  @Input() sessions!: Array<any>
  @Output() moreLoaded = new EventEmitter<Array<any>>();
  isAllSessions = false
  isLoadingMore = false
  limit = 5

  constructor(
    private router: Router,
    private snackbarService: SnackbarService,
    private firestoreService: FirestoreService
  ) { }

  async ngOnInit(): Promise<void> {
    if (this.router.url.includes('leadership-academy')) {
      await this.checkCanLoadMore('leadership-academy-sessions')
    } else if (this.router.url.includes('the-forum')) {
      await this.checkCanLoadMore('the-forum-sessions')
    } else if (this.router.url.includes('pauline-leadership')) {
      await this.checkCanLoadMore('pauline-leadership-sessions')
    }
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

  async checkCanLoadMore(collection: string): Promise<void> {
    const lastDoc: any = await this.firestoreService.getLastSession(collection)

    if (this.sessions[this.sessions.length - 1].id === lastDoc.id) {
      this.isAllSessions = true
    } else {
      this.isAllSessions = false
    }
  }

  async loadNextSessions(collection: string): Promise<void> {
    const nextSessions = await this.firestoreService.loadMoreSessions(collection, this.sessions[this.sessions.length - 1].date)
    const lastDoc: any = await this.firestoreService.getLastSession(collection)

    this.moreLoaded.emit(nextSessions)
    if (nextSessions[nextSessions.length - 1].id === lastDoc.id) {
      this.isAllSessions = true
    }
  }
}
