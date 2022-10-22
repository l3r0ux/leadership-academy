import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  modalVisible: boolean = false
  title: string = ''
  data: any = null

  constructor() { }

  openModal(title: string, data: any = null): void {
    this.modalVisible = true
    this.title = title
    this.data = data
  }

  closeModal():void {
    this.modalVisible = false
    this.title = ''
    this.data = null
  }
}
