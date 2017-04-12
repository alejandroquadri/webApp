import { Injectable } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';

@Injectable()
export class ChatService {

  constructor(
    public af: AngularFire,
  ) {
    console.log('Hello ChatService Provider');
  }

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

}

