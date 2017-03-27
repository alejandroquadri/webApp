import { Injectable } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import * as firebase from 'firebase';

@Injectable()
export class DiaryService {

  constructor(
    public af: AngularFire,
  ) {}

  getDiary(id) {
    return this.af.database.object(`/diary/${id}`);
  }

  reviewMeal(uid, date, key, message) {
    return this.af.database.list(`/diary/${uid}/${date}/${key}/reviews`)
    .push(message);
  }

  rateMeal(uid, date, key, form) {
    return this.af.database.list(`/diary/${uid}/${date}`)
    .update(key, form);
  }

}
