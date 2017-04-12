import { Injectable } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import * as firebase from 'firebase';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class UploadFilesService {

  public uploadSubject = new Subject();
  public uploadObs = this.uploadSubject.asObservable();

  constructor(
    public af: AngularFire,
  ) {
  }

  upload(file, path, uid) {
    console.log('upload file', file[0]);
    const name = file[0].name;
    const blob = new Blob([file[0]], {type: file[0].type});
    console.log(blob);

    const storageRef = firebase.storage().ref();
    const uploadTask = storageRef.child(`${uid}/${path}`).child(name).put(file[0]);

    uploadTask.on('state_changed', (snapshot) => {
      console.log(snapshot);
    }, (error) => {
      console.error(error);
    }, () => {
      const downloadURL = uploadTask.snapshot.downloadURL;
      this.uploadSubject.next(downloadURL);
    });
  }

}

