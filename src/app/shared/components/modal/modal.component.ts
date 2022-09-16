import { animate, animateChild, group, query, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ModalService } from '../../services/modal.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
  animations: [
    trigger('overlayFadeInOut', [
      transition(":enter", [
        style({ opacity: 0 }),
        group([
          animate('100ms ease', style({ opacity: 1 })),
          query('@modalFadeIn', [animateChild()]),
        ])
      ]),
      transition(":leave", [
        style({ opacity: 1 }),
        animate('100ms ease', style({ opacity: 0 })),
      ])
    ]),
    trigger('modalFadeIn', [
      transition(":enter", [
        style({ opacity: 0, transform: 'scale(0.8)' }),
        animate('200ms ease', style({ opacity: 1, transform: 'scale(1)' })),
      ]),
    ]),
  ]
})
export class ModalComponent implements OnInit {
  @ViewChild('overlay') overlay!: ElementRef
  @ViewChild('close') close!: ElementRef

  constructor(public modalService: ModalService) { }

  ngOnInit(): void {
  }

  closeModal(event: any) : void {
    if (event.target === this.overlay.nativeElement) {
      this.modalService.modalVisible = false
    }
  }
}
