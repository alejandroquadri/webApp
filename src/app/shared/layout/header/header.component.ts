import { Component, OnInit } from '@angular/core';

import { AuthService } from '../../services';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isLogged: boolean;

  constructor(
    private authService: AuthService
  ) {
    this.authService.isAuthenticated
    .subscribe( isAuth => {
      this.isLogged = isAuth;
    });
  }

  ngOnInit() {}

  logOut() {
    console.log('logout');
    this.authService.logoutUser()
    .then(
      () => console.log('user logged out'),
      err => console.log('hubo algun problema usuario no pudo desloguearse', err));
  }

}
