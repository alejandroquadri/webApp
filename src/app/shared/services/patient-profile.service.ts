import { Injectable } from '@angular/core';
import { AngularFire, FirebaseObjectObservable } from 'angularfire2';
import * as firebase from 'firebase';

@Injectable()
export class PatientProfileService {

  constructor(
    public af: AngularFire,
  ) {}

  getPatientProfile(uid): FirebaseObjectObservable<any> {
    return this.af.database.object(`/userProfile/${uid}`);
  }

  // este es para obtener el perfil una vez.
  // lo hice para probar un poco firebase SDK
  getProfile(uid): firebase.Promise<any> {
    return firebase.database().ref(`/userProfile/${uid}`).once('value');
  }
}
