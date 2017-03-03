import { Injectable } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import * as firebase from 'firebase';

import { AuthService } from './auth.service';

@Injectable()
export class PatientListService {

  uid: string;
  patientList: FirebaseListObservable<any>;

  constructor(
    public af: AngularFire,
    public authService: AuthService
  ) {
    this.getPatientList();
  }

  getPatientList() {
    this.authService.getUser()
    .subscribe(user => {
      this.uid = user.uid;
      this.patientList = this.af.database.list(`/coachUser/${this.uid}`);
    });
  }
}
