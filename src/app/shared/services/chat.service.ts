import { Injectable } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import * as firebase from 'firebase';

import { AuthService } from './auth.service';
import { ActivityService } from './activity.service';

@Injectable()
export class ChatService {

  chat: any;

  constructor(
    public af: AngularFire,
    public authService: AuthService,
    public activityService: ActivityService
  ) {}

  getChat(chatUid: string): FirebaseListObservable<any[]> {
    return this.af.database.list(`/chats/${chatUid}`);
  }

  pushMsg(chatUid: string, msg: any): firebase.database.ThenableReference {
    return this.af.database.list(`/chats/${chatUid}`)
    .push(msg);
  }

  updateMsg(chatUid: string, msg: any, newMsg: any): firebase.Promise<void> {
    return this.af.database.list(`/chats/${chatUid}`)
    .update(msg, newMsg);
  }

  removeMsg(chatUid: string, msg: any): firebase.Promise<void> {
    return this.af.database.list(`/chats/${chatUid}`)
    .remove(msg);
  }

  getChatFire (chatUid: string) {
    return firebase.database().ref(`/chats/${chatUid}`).once('value');
  }

  mesRead (chatUid: string, author: string) {
    if (this.chat) {this.chat.off(); }
    this.chat = firebase.database().ref(`/chats/${chatUid}`);
    this.chat.on('child_added', (data) => {
      if ((author !== data.val().uid) && (data.val().read === false)) {
        this.chat.child(data.key).update({read: true})
        .then(() => console.log('updated'),
          err => console.log('error')
        );
        this.activityService.updateUnreadCoachMsgs(data.val().uid, false)
        .then( () => console.log('resto uno'));
      }
    });
  }

  getChatFireSDK(chatUid: string) {
    firebase.database().ref(`/chats/${chatUid}`)
    .on('value', data => console.log(data.val()));
  }

}

