import { Component, OnInit } from '@angular/core';
import { FirestoreService } from 'src/app/shared/services/firestore.service';
import { ModalService } from 'src/app/shared/services/modal.service';

@Component({
  selector: 'app-reject-application',
  templateUrl: './reject-application.component.html',
  styleUrls: ['./reject-application.component.scss']
})
export class RejectApplicationComponent implements OnInit {

  constructor(
    public modalService: ModalService,
    private firestoreService: FirestoreService
  ) { }

  ngOnInit(): void {
  }

  async rejectApplication(): Promise<void> {    
    try {
      await this.firestoreService.removeApplication(this.modalService.clickedData)
      this.modalService.closeModal()
      // TODO: show confirmation snackbar
    } catch (error) {
      console.log(error)
      this.modalService.closeModal()
      // TODO: show error snackbar
    }
  }
}
