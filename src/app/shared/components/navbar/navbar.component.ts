import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  @ViewChild('details') details!: ElementRef

  constructor() { }

  ngOnInit(): void {
  }

  openDetails(): void {
    this.details.nativeElement.classList.toggle('visible')
  }
}
