import { Injectable } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import * as firebase from 'firebase';

@Injectable()
export class PatientProfileService {

  uid: string;
  patientList: FirebaseListObservable<any>;

  constructor(
    public af: AngularFire,
  ) {}

  getPatientProfile(uid) {
    return this.af.database.object(`/userProfile/${uid}`);
  }
}
