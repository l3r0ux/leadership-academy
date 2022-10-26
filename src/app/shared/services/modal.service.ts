import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  paulineSessionAddedSubject: Subject<any> = new Subject()
  paulineSessionUpdatedSubject: Subject<any> = new Subject()
  paulineSessionDeletedSubject: Subject<any> = new Subject()
  
  leadershipSessionAddedSubject: Subject<any> = new Subject()
  leadershipSessionUpdatedSubject: Subject<any> = new Subject()
  leadershipSessionDeletedSubject: Subject<any> = new Subject()
  leadershipCountryAddedSubject: Subject<any> = new Subject()
  leadershipCountryUpdatedSubject: Subject<any> = new Subject()
  leadershipCountryDeletedSubject: Subject<any> = new Subject()
  
  forumSessionAddedSubject: Subject<any> = new Subject()
  forumSessionUpdatedSubject: Subject<any> = new Subject()
  forumSessionDeletedSubject: Subject<any> = new Subject()
  forumCountryAddedSubject: Subject<any> = new Subject()
  forumCountryUpdatedSubject: Subject<any> = new Subject()
  forumCountryDeletedSubject: Subject<any> = new Subject()

  applicationDeletedSubject: Subject<any> = new Subject()

  modalVisible: boolean = false
  title: string = ''
  data: any = null

  constructor() { }

  openModal(title: string, data: any = null): void {
    this.modalVisible = true
    this.title = title
    this.data = data
  }

  closeModal(): void {
    this.modalVisible = false
    this.title = ''
    this.data = null
  }
}
