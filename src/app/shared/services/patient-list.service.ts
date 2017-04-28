import { Injectable } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import * as firebase from 'firebase';

import { AuthService } from './auth.service';

@Injectable()
export class PatientListService {

  constructor(
    public af: AngularFire,
    public authService: AuthService
  ) {
    this.getPatientList();
  }

  getPatientList() {
    return this.af.database.list(`/coachUser/${this.authService.current.uid}`);
  }
}
