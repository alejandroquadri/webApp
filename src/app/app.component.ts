import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFire } from 'angularfire2';

import { AuthService } from './shared';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app anda!';

  constructor (
    private authService: AuthService,
    public af: AngularFire,
    private router: Router
  ) {
    this.authService.getUser()
    .subscribe( user => {
      console.log(user);
      if (!user) {
        this.router.navigate(['/login']);
      }
    });

  }
}
