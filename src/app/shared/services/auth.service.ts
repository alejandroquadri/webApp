import { Injectable, Inject } from '@angular/core';
import { AngularFire, FirebaseAuthState, AuthProviders, AuthMethods, AngularFireAuth } from 'angularfire2';
import * as firebase from 'firebase';
// import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subject } from 'rxjs/Subject';
import { ReplaySubject } from 'rxjs/ReplaySubject';

@Injectable()
export class AuthService {

  private isAuthenticatedSubject = new ReplaySubject<boolean>(1);
  public isAuthenticated = this.isAuthenticatedSubject.asObservable();

  public current: any;

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
        console.log('usaurio en auth service isLogged', user);
        this.current = user;
        this.isAuthenticatedSubject.next(true);
      } else {
        console.log('no hay usuario');
        this.current = null;
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
      .set({email: newEmail, authCoach: false});
    });
  }

  resetPassword(email: string): any {
    console.log(email);
    return firebase.auth().sendPasswordResetEmail(email);
  }
}
