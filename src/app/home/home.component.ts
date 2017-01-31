import { Component, OnInit } from '@angular/core';

import { AuthService } from '../shared';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  auth;

  constructor(
    public authService: AuthService
  ) {
    console.log('construye home.component');
  }

  ngOnInit() {
    console.log('inicia home.component', this.auth);
  }

  logOut() {
    console.log('logout');
    this.authService.logoutUser();
  }

}
