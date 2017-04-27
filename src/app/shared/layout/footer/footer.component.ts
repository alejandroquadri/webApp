import { Component, OnInit } from '@angular/core';

import { AuthService } from '../../services';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  today: number = Date.now();
  isLogged: boolean;

  constructor(
    private authService: AuthService
  ) {
    this.authService.isAuthenticated
    .subscribe( isAuth => {
      this.isLogged = isAuth;
    });
  }

  ngOnInit() {
  }

}
