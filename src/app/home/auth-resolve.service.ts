import { Injectable } from '@angular/core';
import { Router, Resolve, RouterStateSnapshot,
         ActivatedRouteSnapshot } from '@angular/router';

import { AuthService } from '../shared';

@Injectable()
export class AuthResolver implements Resolve<any> {

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    console.log('arranca el resolver');
    const id = route.params['id'];

    return this.authService.current
    .subscribe(auth => {
      if (auth) {
        console.log('hay usuario', auth);
        return auth;
      } else { // id not found
        console.log('se va a login');
        this.router.navigate(['/login']);
        return null;
      }
    });

  }
}
