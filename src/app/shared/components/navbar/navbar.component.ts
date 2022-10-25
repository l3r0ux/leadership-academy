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
  febaLogo = 'https://res.cloudinary.com/djkyfcfl1/image/upload/v1666705060/leadership_clarity/FEBA-logo_a8vtnj.jpg'
  febcLogo = 'https://res.cloudinary.com/djkyfcfl1/image/upload/v1666705060/leadership_clarity/FEBC-logo_crwz0h.jpg'

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
    await this.authService.logout()
    this.router.navigate(['/'])
    this.authService.currentUser = null
  }

  isEnrolled(program: string): boolean {
    return this.authService.currentUser?.programsEnrolled.includes(program)
  }
}
