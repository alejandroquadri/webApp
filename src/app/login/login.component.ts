import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

// models
import { Login } from '../shared';
// validators
import { EmailValidator } from '../shared';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    user = new Login('', '');
    submitted = false;
    loginForm: FormGroup;
    formErrors = {
      'email': '',
      'password': ''
    };
    validationMessages = {
      'email': {
        'required': 'campo obligatorio',
        'invalidEmail': 'email invalido'
      },
      'password': {
        'required': 'campo obligatorio',
        'minlength': 'La contraseña debe tener al menos 6 caracteres',
      }
    };

    constructor(
      public fb: FormBuilder
    ) {}

    ngOnInit() {
      console.log('Hello LoginPage Page', this.user);
      this.buildForm();
    }

    buildForm() {
      this.loginForm = this.fb.group({
        email: [this.user.email, [Validators.required, EmailValidator.isValid ]],
        password: [this.user.password, Validators.compose([Validators.minLength(6), Validators.required])]
      });

      this.loginForm.valueChanges
      .subscribe(data => this.onValueChanged(data));
      this.onValueChanged();
    }

    onValueChanged(data?: any) {
      if (!this.loginForm) { return; }
      const form = this.loginForm;


      for (const field in this.formErrors) {
        // clear previous error message (if any)
        if (this.formErrors.hasOwnProperty(field)) {
          this.formErrors[field] = '';
          const control = form.get(field);
          if (control && control.dirty && !control.valid) {
            const messages = this.validationMessages[field];
            for (const key in control.errors) {
              if (control.errors.hasOwnProperty(key)) {
                this.formErrors[field] += messages[key] + ' ';
              }
            }
          }
        }
      }
    }

    onSubmit() {
      console.log('Submit!', this.loginForm.value.email , this.loginForm.value.password);
      this.user = new Login('', '');
      this.buildForm();
    }

}
