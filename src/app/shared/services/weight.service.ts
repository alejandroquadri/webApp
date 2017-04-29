import { Injectable } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import * as firebase from 'firebase';

import { AuthService } from './auth.service';

@Injectable()
export class WeightService {

  constructor(
    public af: AngularFire,
    public authService: AuthService
  ) {
  }

  getWeightLogs(uid) {
    return this.af.database.list(`/weightLogs/${uid}`);
  }

}
