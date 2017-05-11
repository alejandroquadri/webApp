import { Injectable } from '@angular/core';
import { AngularFire, FirebaseObjectObservable } from 'angularfire2';
import * as firebase from 'firebase';
import { Subject } from 'rxjs/Subject';

import { AuthService } from './auth.service';

@Injectable()
export class ActivityService {

  // patientListSubject = new Subject();
  // patientList = this.patientListSubject.asObservable();

  constructor(
    public af: AngularFire,
    public authService: AuthService
  ) {}

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

}
