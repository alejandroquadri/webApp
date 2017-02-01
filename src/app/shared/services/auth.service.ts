import { Injectable } from '@angular/core';
import { AngularFire, FirebaseAuthState } from 'angularfire2';
import { Subject } from 'rxjs/Subject';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import 'rxjs/add/operator/distinctUntilChanged';

@Injectable()
export class AuthService {
  isLoggedIn = false;

  // store the URL so we can redirect after logging in
  redirectUrl: string;
  fireAuth: any;

  // private currentSubject = new Subject();
  // public current = this.currentSubject.asObservable().distinctUntilChanged();

  private currentSubject = new ReplaySubject();
  public current = this.currentSubject.asObservable();

  private isAuthenticatedSubject = new ReplaySubject<boolean>(1);
  public isAuthenticated = this.isAuthenticatedSubject.asObservable();

  constructor(
    public af: AngularFire
  ) {
    this.getCurrent();
  }

  loginUser(newEmail: string, newPassword: string): firebase.Promise<FirebaseAuthState> {
    return this.af.auth.login({ email: newEmail, password: newPassword });
  }

  logoutUser(): any {
    return this.af.auth.logout();
  }

  signupUser(newEmail: string, newPassword: string): any {
    return this.af.auth.createUser({ email: newEmail, password: newPassword })
    .then(newUser => {
      this.af.database.object(`/userProfile/${newUser.uid}`)
      .set({email: newEmail, coach: false});
    });
  }

  getCurrent() {
    console.log('auth service chequea si hay usuario');
    this.af.auth.subscribe( user => {
      if (user) {
        this.fireAuth = user.auth;
        this.currentSubject.next(user);
        this.isAuthenticatedSubject.next(true);
        console.log(user);
      } else {
        console.log('no hay usuario');
        this.isAuthenticatedSubject.next(false);
      }
    },
    err => {
      console.log('error handler auth', err);
      this.isAuthenticatedSubject.next(false);
    });
  }
}
