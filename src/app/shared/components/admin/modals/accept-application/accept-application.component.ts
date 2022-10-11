import { Component, OnInit } from '@angular/core';
import { FirestoreService } from 'src/app/shared/services/firestore.service';
import { ModalService } from 'src/app/shared/services/modal.service';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';

@Component({
  selector: 'app-accept-application',
  templateUrl: './accept-application.component.html',
  styleUrls: ['./accept-application.component.scss']
})
export class AcceptApplicationComponent implements OnInit {

  constructor(
    public modalService: ModalService,
    private firestoreService: FirestoreService,
    private snackbarService: SnackbarService
  ) { }

  ngOnInit(): void {
  }

  async acceptApplication(): Promise<void> {
    try {
      await this.firestoreService.acceptApplication(this.modalService.clickedData)
      await this.firestoreService.removeApplication(this.modalService.clickedData)
      this.modalService.closeModal()
      this.snackbarService.showSnackbar({ text: 'Application successfully accepted', success: true })
    } catch (error) {
      console.log(error)
      this.modalService.closeModal()
      this.snackbarService.showSnackbar({ text: 'An error occurred', success: false })
    }
  }
}
