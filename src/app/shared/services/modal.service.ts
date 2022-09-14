import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  modalVisible: boolean = false
  title!: string

  constructor() { }

  toggleModal(title: string): void {
    this.modalVisible = !this.modalVisible
    this.title = title
  }
}
