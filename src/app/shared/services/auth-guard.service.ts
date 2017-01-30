// import { Injectable } from '@angular/core';
// import { CanActivate } from '@angular/router';
//
// @Injectable()
// export class AuthGuard implements CanActivate {
//   canActivate() {
//     console.log('AuthGuard#canActivate called');
//     return true;
//   }
// }

import { Injectable } from '@angular/core';
import {
    CanActivate, Router,
    ActivatedRouteSnapshot,
    RouterStateSnapshot
  } from '@angular/router';

// import { AuthService } from '../../shared';
// lo de arriba, por alguna razon si lo importo del barrel tira error. Por eso lo importo
// directamente de su carpeta contenedora
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
      const url: string = state.url;
      console.log('url', url);
      return this.checkLogin(url);
    }

  checkLogin(url: string): boolean {
    if (this.authService.isLoggedIn) { return true; }
    console.log('se va a loggin');

    // Store the attempted URL for redirecting
    this.authService.redirectUrl = url;

    // Navigate to the login page with extras
    this.router.navigate(['/login']);
    return false;
  }
}
