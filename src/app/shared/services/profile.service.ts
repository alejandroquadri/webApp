import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { Subject } from 'rxjs/Subject';
import { AngularFire, FirebaseObjectObservable } from 'angularfire2';
import * as firebase from 'firebase';

import { AuthService } from './auth.service';

@Injectable()
export class ProfileService {

  uid: string;
  fireProfile: FirebaseObjectObservable<any>;

  constructor(
    public af: AngularFire,
    public authService: AuthService
  ) {
    this.setProfile();
  }

  setProfile() {
    this.authService.getUser()
    .subscribe(user => {
      this.uid = user.uid;
      this.fireProfile = this.af.database.object(`/coachProfile/${this.uid}`);
    });
  }

  update(form): firebase.Promise<void> {
    return this.fireProfile.update(form);
  }

  getProfile() {
    return firebase.database().ref(`/coachProfile/${this.uid}`).once('value');
  }
}

