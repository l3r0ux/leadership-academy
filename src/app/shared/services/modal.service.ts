import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  modalVisible: boolean = false
  title: string = ''

  constructor() { }

  openModal(title: string): void {
    this.modalVisible = true
    this.title = title
  }

  closeModal():void {
    this.modalVisible = false
    this.title = ''
  }
}
