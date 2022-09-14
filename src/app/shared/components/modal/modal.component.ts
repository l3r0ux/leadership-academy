import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ModalService } from '../../services/modal.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
  animations: [
    trigger('inOutAnimation', [
        transition(':enter', [
            style({ opacity: 0 }),
            animate('100ms ease-out', style({ opacity: 1 }))
          ]
        ),
        transition(':leave', [
            style({ opacity: 1 }),
            animate('100ms ease-in', style({ opacity: 0 }))
          ]
        )
      ]
    )
  ]
})
export class ModalComponent implements OnInit {
  @ViewChild('overlay') overlay!: ElementRef
  @ViewChild('close') close!: ElementRef

  constructor(public modalService: ModalService) { }

  ngOnInit(): void {
  }

  closeModal(event: any) : void {
    if (event.target === this.overlay.nativeElement || event.target === this.close.nativeElement) {
      this.modalService.modalVisible = false
    }
  }
}
