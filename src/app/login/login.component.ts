import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { Login } from '../shared';
// validators
// import { EmailValidator } from '../shared';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    user = new Login('', '');
    submitted = false;

    constructor(
    ) {}

    ngOnInit() {
      console.log('Hello LoginPage Page', this.user);
    }

    onSubmit() {
      console.log('Submit!', this.user);
      // this.loginForm.reset();
    }

}
