import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ModalService } from '../../services/modal.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  @ViewChild('details') details!: ElementRef

  constructor(public modalService: ModalService) { }

  ngOnInit(): void {
  }

  openDetails(): void {
    this.details.nativeElement.classList.toggle('visible')
  }
}
