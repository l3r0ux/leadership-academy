import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ModalService } from '../../services/modal.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  @ViewChild('details') details!: ElementRef

  constructor(
    public modalService: ModalService,
    public authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  openDetails(): void {
    this.details.nativeElement.classList.toggle('visible')
  }

  async logout(): Promise<void> {
    await this.authService.logout();
    this.router.navigate(['/'])
  }

  isEnrolled(program: string): boolean {
    return this.authService.currentUser?.programsEnrolled.includes(program)
  }
}
