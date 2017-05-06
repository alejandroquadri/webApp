import { Injectable } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import * as firebase from 'firebase';
import { Subject } from 'rxjs/Subject';

import { AuthService } from './auth.service';

@Injectable()
export class PatientListService {

  patientListSubject = new Subject();
  patientList = this.patientListSubject.asObservable();

  constructor(
    public af: AngularFire,
    public authService: AuthService
  ) {
    this.getPatientList().subscribe( patients => {
      this.patientListSubject.next(patients);
    });
  }

  getPatientList() {
    return this.af.database.list(`/coachPatients/${this.authService.current.uid}`);
  }
}
