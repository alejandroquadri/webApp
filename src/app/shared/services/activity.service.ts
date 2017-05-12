import { Injectable } from '@angular/core';
import { AngularFire, FirebaseObjectObservable } from 'angularfire2';
import * as firebase from 'firebase';
import { ReplaySubject } from 'rxjs/ReplaySubject';

import { AuthService } from './auth.service';
import { ProfileService } from './profile.service';

@Injectable()
export class ActivityService {

  activitySubject = new ReplaySubject(1);
  activityObs = this.activitySubject.asObservable();
  activity: any;

  constructor(
    public af: AngularFire,
    public authService: AuthService,
    public profileService: ProfileService
  ) {
    this.getActivity().subscribe( activity => {
      this.activitySubject.next(activity);
      this.activity = activity;
    });
  }

  getActivity(): FirebaseObjectObservable<any> {
    return this.af.database.object(`/activity/coaches/${this.authService.current.uid}`);
  }

  updatePendingReviewCount(patientUid: string, add: boolean): firebase.Promise<any> {
    return firebase.database().ref(`/activity/coaches/${this.authService.current.uid}/${patientUid}/pendingReviews`)
    .transaction( value => {
      if (add) {
        return value + 1;
      } else {
        if (value > 0) {
          return value - 1;
        } else {
          return value;
        }
      }
    });
  }

  updateUnreadPatientMsgs (patientUid: string, add: boolean): firebase.Promise<any> {
    return firebase.database().ref(`/activity/patients/${patientUid}/unreadMsgs`)
    .transaction( value => {
      if (add) {
        return value + 1;
      } else {
        if (value > 0) {
          return value - 1;
        } else {
          return value;
        }
      }
    });
  }

  updateUnreadCoachMsgs(patientUid: string, add: boolean): firebase.Promise<any> {
    console.log('entra', this.authService.current.uid, patientUid, add);
    return firebase.database().ref(`/activity/coaches/${this.authService.current.uid}/${patientUid}/unreadMsgs`)
    .transaction( value => {
      console.log('valor es', value);
      if (add) {
        console.log('suma');
        return value + 1;
      } else {
        if (value > 0) {
          console.log('resta');
          return value - 1;
        } else {
          console.log('igual');
          return value;
        }
      }
    });
  }

  addActivityFeed(patientUid: string, date: string, key: string, type: string, message?: string) {
    let form, text;
    if ( type === 'review') { text = `${this.profileService.current.displayName} te envia feedback sobre tu comida`; }
    if ( type === 'mes') { text = message; }

    form = {
      date: date,
      key: key,
      text: text,
      read: false
    };
    return this.af.database.list(`/activity/patients/${patientUid}/feed`)
    .push(form);
  }

}
