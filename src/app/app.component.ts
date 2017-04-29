import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFire } from 'angularfire2';

import { AuthService, ProfileService } from './shared';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  logged: boolean;

  constructor (
    private authService: AuthService,
    private profileService: ProfileService,
    public af: AngularFire,
    private router: Router
  ) {
    this.authService.getUser().subscribe( user => {
      if (user) {
        this.logged = true;
        this.profileService.getProfile()
        .subscribe( prof => {
          if (prof) {
            this.router.navigate(['/']);
          }
        });
      } else {
        this.logged = false;
        this.router.navigate(['/login']);
      }
    });
  }

  ngOnInit() {}
}
