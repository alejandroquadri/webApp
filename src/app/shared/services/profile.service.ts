import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { Subject } from 'rxjs/Subject';
import { AngularFire, FirebaseObjectObservable } from 'angularfire2';
import * as firebase from 'firebase';

import { AuthService } from './auth.service';

@Injectable()
export class ProfileService {

  current: any;

  constructor(
    public af: AngularFire,
    public authService: AuthService
  ) {
    this.authService.getUser().subscribe(user => {
      if (user) {
        this.af.database.object(`/coachProfile/${this.authService.current.uid}`)
        .subscribe(prof => {
          this.current = prof;
        });
      }
    });
  }

  getProfile(): FirebaseObjectObservable<any> {
    return this.af.database.object(`/coachProfile/${this.authService.current.uid}`);
  }

  update(form): firebase.Promise<void> {
    return this.af.database.object(`/coachProfile/${this.authService.current.uid}`)
    .update(form);
  }

  getProfileOnce(): firebase.Promise<any> {
    return firebase.database().ref(`/coachProfile/${this.authService.current.uid}`).once('value');
  }
}

