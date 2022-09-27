import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  modalVisible: boolean = false
  title: string = ''
  clickedData: any = null

  constructor() { }

  openModal(title: string, clickedData: any = null): void {
    this.modalVisible = true
    this.title = title
    this.clickedData = clickedData
  }

  closeModal():void {
    this.modalVisible = false
    this.title = ''
    this.clickedData = null
  }
}
