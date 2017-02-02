import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

// models
import { Login, AuthService } from '../shared';
// validators
import { EmailValidator } from '../shared';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

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
    loginPage = true;
    signupPage = false;
    resetPasswordPage = false;
    authType = '';

    constructor(
      private fb: FormBuilder,
      private authService: AuthService,
      private router: Router,
      private route: ActivatedRoute
    ) {}

    ngOnInit() {
      this.buildForm();

      this.route.url.subscribe(data => {
        // Get the last piece of the URL
        this.authType = data[data.length - 1].path;
        // Set a title for the page accordingly

        switch (this.authType) {
          case 'login' :
            this.loginPage = true;
            this.signupPage = false;
            this.resetPasswordPage = false;
          break;

          case 'register' :
            this.loginPage = false;
            this.signupPage = true;
            this.resetPasswordPage = false;
          break;

          case 'reset' :
            this.loginPage = false;
            this.signupPage = false;
            this.resetPasswordPage = true;
          break;
        }
      });
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
      if (this.loginPage) {
        console.log('va a login', this.loginForm.value.email , this.loginForm.value.password);
        this.login(this.loginForm.value.email , this.loginForm.value.password);
      }
      if (this.signupPage) {
        console.log('va a signup', this.loginForm.value.email , this.loginForm.value.password);
        this.signUp(this.loginForm.value.email , this.loginForm.value.password);
      }
      if (this.resetPasswordPage) {
        console.log ('va a reset', this.loginForm.value.email);
        this.resetPassword(this.loginForm.value.email);
      }
      this.user = new Login('', '');
      this.buildForm();
    }

    login(email: string, password: string) {
      this.authService.loginUser(email, password)
      .then(
        authData => {
        console.log('va al home');
        this.router.navigate(['/']);
      },
      err => console.log('error', err)
      );
    }

    signUp(email: string, password: string) {
      this.authService.signupUser(email, password)
      .then( authData => {
        this.router.navigate(['/']);
      },
      err => console.log('error', err)
      );
    }

    resetPassword(email: string) {
      this.authService.resetPassword(email)
      .then(
        reset => console.log('reseteada', reset),
        err => console.log('error', err)
        );
    }

    showLogin() {
      this.router.navigate(['/login']);
    }

    showRegister() {
      this.router.navigate(['/register']);
    }

    showResetPassword() {
      this.router.navigate(['/reset']);
    }
}
