import { Injectable, Inject } from '@angular/core';
import { AngularFire, FirebaseObjectObservable } from 'angularfire2';
import * as firebase from 'firebase';
import { Subject } from 'rxjs/Subject';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/take';


import { AuthService } from './auth.service';

@Injectable()
export class ProfileService {

  uid: string;
  profile: FirebaseObjectObservable<any>;

  constructor(
    public af: AngularFire,
    public authService: AuthService
  ) {
    this.getUid();
  }

  getUid() {
    this.authService.getUser()
    .subscribe( user => {
      if (user) {
        console.log('usuario actual en profile', user.uid);
        this.uid = user.uid;
        this.profile = this.getProfile();
      }
    });
  }

  update(form): firebase.Promise<void> {
    return this.profile.update(form);
  }

  getProfile(): FirebaseObjectObservable<any> {
    return this.af.database.object(`/coachProfile/${this.uid}`);
        // this.profileObs = this.af.database.object(`/userProfile/${this.authData.fireAuth.uid}`);
  }

}

