import { Injectable } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import * as firebase from 'firebase';
import { ReplaySubject } from 'rxjs/ReplaySubject';

import { AuthService } from './auth.service';

@Injectable()
export class PatientListService {

  patientListSubject = new ReplaySubject(1);
  patientList = this.patientListSubject.asObservable();
  list: any;

  constructor(
    public af: AngularFire,
    public authService: AuthService
  ) {
    this.getPatientList().subscribe( patients => {
      this.patientListSubject.next(patients);
      this.list = patients;
    });
  }

  getPatientList() {
    return this.af.database.list(`/coachPatients/${this.authService.current.uid}`);
  }
}
