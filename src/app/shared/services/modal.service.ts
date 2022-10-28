import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  paulineSessionChangedSubject: Subject<any> = new Subject()
  
  leadershipSessionChangedSubject: Subject<any> = new Subject()
  leadershipCountryChangedSubject: Subject<any> = new Subject()
  
  forumSessionChangedSubject: Subject<any> = new Subject()
  forumCountryChangedSubject: Subject<any> = new Subject()

  applicationDeletedSubject: Subject<any> = new Subject()

  studentUnenrolledSubject: Subject<any> = new Subject()

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
