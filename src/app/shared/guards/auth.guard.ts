import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router
  ) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if (route.routeConfig?.path === 'admin' && this.authService.currentUser.isAdmin) {
        return true
      }
      if (this.authService.isLoggedIn && this.isEnrolled(route.routeConfig?.path)) {
        return true
      } else {
        this.router.navigate(['/'])
        return false
      }
  }
  
  isEnrolled(program: string | undefined): boolean {
    return this.authService.currentUser?.programsEnrolled.indexOf(program) !== -1
  }
}
