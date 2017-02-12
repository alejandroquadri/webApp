import { Component, OnInit } from '@angular/core';

import { AuthService } from '../../services';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(
    private authService: AuthService
  ) {}

  ngOnInit() {
  }

  logOut() {
    console.log('logout');
    this.authService.logoutUser()
    .then(
      () => console.log('user logged out'),
      err => console.log('hubo algun problema usuario no pudo desloguearse', err));
  }

}
