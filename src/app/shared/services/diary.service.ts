import { Injectable } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import * as firebase from 'firebase';

@Injectable()
export class DiaryService {

  constructor(
    public af: AngularFire,
  ) {}

  getDiary(id) {
    return this.af.database.list(`/diary/${id}`);
  }

}
