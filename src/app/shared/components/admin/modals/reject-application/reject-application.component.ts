import { Component, OnInit } from '@angular/core';
import { FirestoreService } from 'src/app/shared/services/firestore.service';
import { ModalService } from 'src/app/shared/services/modal.service';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';

@Component({
  selector: 'app-reject-application',
  templateUrl: './reject-application.component.html',
  styleUrls: ['./reject-application.component.scss']
})
export class RejectApplicationComponent implements OnInit {

  constructor(
    public modalService: ModalService,
    private firestoreService: FirestoreService,
    private snackbarService: SnackbarService
  ) { }

  ngOnInit(): void {
  }

  async rejectApplication(): Promise<void> {    
    try {
      await this.firestoreService.removeApplication(this.modalService.clickedData)
      this.modalService.closeModal()
      this.snackbarService.showSnackbar({ text: 'Application successfully rejected', success: true })
    } catch (error) {
      console.log(error)
      this.modalService.closeModal()
      this.snackbarService.showSnackbar({ text: 'An error occurred', success: false })
    }
  }
}
