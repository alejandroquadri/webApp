import { Injectable, Inject } from '@angular/core';
import { AngularFire, FirebaseAuthState, AuthProviders, AuthMethods, AngularFireAuth } from 'angularfire2';
import * as firebase from 'firebase';
import { Subject } from 'rxjs/Subject';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import 'rxjs/add/operator/distinctUntilChanged';

@Injectable()
export class AuthService {
  isLoggedIn = false;

  private currentSubject = new Subject();
  public current = this.currentSubject.asObservable().distinctUntilChanged();

  private isAuthenticatedSubject = new ReplaySubject<boolean>(1);
  public isAuthenticated = this.isAuthenticatedSubject.asObservable();

  constructor(
    public af: AngularFire,
  ) {
    console.log('inicia auth');
    this.isLogged();
  }

  getUser(): any {
    return this.af.auth;
  }

  isLogged() {
    this.af.auth.subscribe( user => {
      if (user) {
        this.currentSubject.next(user);
        this.isAuthenticatedSubject.next(true);
      } else {
        this.isAuthenticatedSubject.next(false);
      }
    },
    err => {
      console.log('error handler auth', err);
      this.isAuthenticatedSubject.next(false);
    });
  }

  loginUser(newEmail: string, newPassword: string): firebase.Promise<FirebaseAuthState> {
    return this.af.auth.login({ email: newEmail, password: newPassword });
  }

  logoutUser(): Promise<void> {
    return this.af.auth.logout();
  }

  signupUser(newEmail: string, newPassword: string): firebase.Promise<FirebaseAuthState> {
    return this.af.auth.createUser({ email: newEmail, password: newPassword })
    .then(newUser => {
      this.af.database.object(`/coachProfile/${newUser.uid}`)
      .set({email: newEmail, coach: true, authCoach: false});
    });
  }

  resetPassword(email: string): any {
    console.log(email);
    return firebase.auth().sendPasswordResetEmail(email);
  }
}
