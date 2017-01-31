import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AngularFire } from 'angularfire2';

import { AuthService } from './shared';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app anda!';

  constructor (
    private authService: AuthService,
    public af: AngularFire,
    private router: Router
  ) {
    console.log('construye app.component');
    af.auth.subscribe( user => {
      if (!user) {
        this.router.navigate(['/login']);
      }
    });
  }

  ngOnInit() {
    console.log('inicia app.component');
    this.authService.getCurrent();
  }
}
