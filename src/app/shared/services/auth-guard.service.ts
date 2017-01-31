import { Injectable } from '@angular/core';
import {
    CanActivate, Router,
    ActivatedRouteSnapshot,
    RouterStateSnapshot
  } from '@angular/router';
  import { Observable } from 'rxjs/Rx';
  import 'rxjs/add/operator/take';

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

  // canActivate(
  //   route: ActivatedRouteSnapshot,
  //   state: RouterStateSnapshot): boolean {
  //     const url: string = state.url;
  //     console.log('url', url);
  //     return this.checkLogin(url);
  //   }

  // checkLogin(url: string): boolean {
  //   if (this.authService.fireAuth) { return true; }
  //   console.log('se va a loggin');
  //
  //   // Store the attempted URL for redirecting
  //   this.authService.redirectUrl = url;
  //
  //   // Navigate to the login page with extras
  //   this.router.navigate(['/login']);
  //   return false;
  // }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> {
      return this.authService.isAuthenticated.take(1);
  }

}
