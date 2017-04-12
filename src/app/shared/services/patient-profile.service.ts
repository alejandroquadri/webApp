import { Injectable } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import * as firebase from 'firebase';

@Injectable()
export class PatientProfileService {

  uid: string;
  patientList: FirebaseListObservable<any>;

  constructor(
    public af: AngularFire,
  ) {
    console.log('patient profile');
  }

  getPatientProfile(uid) {
    return this.af.database.object(`/userProfile/${uid}`);
  }

  // este es para obtener el perfil una vez.
  // lo hice para probar un poco firebase SDK
  getProfile(uid): firebase.Promise<any> {
    return firebase.database().ref(`/userProfile/${uid}`).once('value');
  }
}
