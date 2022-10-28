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
  @ViewChild('mobileSidenav') mobileSidenav!: ElementRef
  febaLogo = 'https://res.cloudinary.com/djkyfcfl1/image/upload/v1666945601/leadership_clarity/FEBA-logo_azy1cy.jpg'
  febcLogo = 'https://res.cloudinary.com/djkyfcfl1/image/upload/v1666945601/leadership_clarity/FEBC-logo_p4xfsw.jpg'

  constructor(
    public modalService: ModalService,
    public authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  async logout(): Promise<void> {
    await this.authService.logout()
    this.router.navigate(['/'])
    this.authService.currentUser = null
  }

  isEnrolled(program: string): boolean {
    return this.authService.currentUser?.programsEnrolled.includes(program)
  }

  toggleSideNav(): void {
    this.mobileSidenav.nativeElement.classList.toggle('visible')
  }
}
