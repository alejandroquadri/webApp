import { Component, OnInit } from '@angular/core';

import { AuthService } from '../shared';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(
    public authService: AuthService
  ) {}

  ngOnInit() {
    console.log('entre a home');
  }

  logOut() {
    console.log('logout');
    this.authService.logoutUser();
  }

}
