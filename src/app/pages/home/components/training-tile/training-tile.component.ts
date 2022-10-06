import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';
import { ModalService } from 'src/app/shared/services/modal.service';

@Component({
  selector: 'app-training-tile',
  templateUrl: './training-tile.component.html',
  styleUrls: ['./training-tile.component.scss']
})
export class TrainingTileComponent implements OnInit {
  @Input() tile!: any;
  @ViewChild('image', {static: true}) image!: ElementRef;

  constructor(
    private router: Router,
    public authService: AuthService,
    private modalService: ModalService
  ) { }

  ngOnInit(): void {
  }

  isEnrolled(program: string): boolean {
    return this.authService.currentUser?.programsEnrolled.includes(program)
  }

  navigate(tile: any): void {
    if (this.authService.isLoggedIn && this.isEnrolled(tile.program)) {
      this.router.navigate([tile.link])
    } else if (this.authService.isLoggedIn && !this.isEnrolled(tile.program)) {
      this.modalService.openModal('Apply')
    } else {
      this.modalService.openModal('Login')
    }
  }
}
