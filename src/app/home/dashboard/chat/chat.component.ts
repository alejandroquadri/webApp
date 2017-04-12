import { Component, ViewChild, OnInit, AfterViewChecked } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { AngularFire,  } from 'angularfire2';
import * as moment from 'moment';

import { ProfileService, ChatService, PatientProfileService } from '../../../shared';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit, AfterViewChecked {

  messages: any;
  profileObject: any;
  patientUid: any;
  patientProfile: any;
  chat: any;
  chatUid: string;
  @ViewChild('chatMessage') message;
  @ViewChild('chatUi') chatUi;

  constructor(
    public af: AngularFire,
    private route: ActivatedRoute,
    private router: Router,
    public profileService: ProfileService,
    public chatService: ChatService,
    public patientProfileService: PatientProfileService
) {
    this.profileService.fireProfile
    .subscribe(prof => {
      this.profileObject = prof;
      this.route.params.forEach((params: Params) => {
        this.patientUid = params['id'];
        this.patientProfileService.getPatientProfile(this.patientUid).subscribe(patient => {
          this.patientProfile = patient;
        });
        this.chatUid = `${prof.$key}&${this.patientUid}`;
        this.chat = this.chatService.getChat(this.chatUid);
      });
    });
}

  ngOnInit() {}

  ngAfterViewChecked() {
      this.scrollToBottom();
  }

  send() {
    console.log(this.message.nativeElement.value);
    if (this.message.nativeElement.value !== '') {
      const form = {
        content: this.message.nativeElement.value,
        displayName: this.profileObject.displayName,
        timestamp: moment().format(),
      };
      console.log(form);
      this.chatService.pushMsg(this.chatUid, form)
      .then (
        (ret) => {
          console.log('msg sent', ret);
          this.message.nativeElement.value = '';
        },
        (err) => console.log('error', err)
      );
    }
  }

  scrollToBottom(): void {
    this.chatUi.nativeElement.scrollTop = this.chatUi.nativeElement.scrollHeight;
  }

}
