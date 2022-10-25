import { Component, Input, OnInit } from '@angular/core';
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
  loading = false
  
  constructor(public modalService: ModalService,
    private firestoreService: FirestoreService,
    private snackbarService: SnackbarService
  ) { }

  ngOnInit(): void {
  }

  async toggleLive(event: any, session: any) {
    const foundSession = this.sessions[this.sessions.findIndex((sessionI: any) => sessionI.date === session.date)]
    foundSession.isLive = event.target.checked

    this.loading = true
    try {
      await this.firestoreService.updateData(foundSession, 'leadership-academy-sessions')
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
