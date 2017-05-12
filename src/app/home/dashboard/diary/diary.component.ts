import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import * as moment from 'moment';

import { ProfileService, DiaryService, ObjectIteratePipe, ActivityService } from '../../../shared';

@Component({
  selector: 'app-diary',
  templateUrl: './diary.component.html',
  styleUrls: ['./diary.component.css']
})
export class DiaryComponent implements OnInit {

  patientUid: any;
  coachProfile: any;
  diary: any;
  @ViewChild('review') review;
  search: string;
  check: false;
  state = 'pending';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private diaryService: DiaryService,
    private activityService: ActivityService,
    private profileService: ProfileService,
    private objectIteratePipe: ObjectIteratePipe
  ) {
    this.profileService.getProfile().subscribe( profile => {
      this.coachProfile = profile;
    });
  }

  ngOnInit() {
    this.route.parent.params.forEach((params: Params) => { // pongo parent porque es una ruta previa
      this.patientUid = params['id'];
      this.diary = this.diaryService.getDiary(this.patientUid);
    });
  }

  sendReview(review, date, key) {
    if (review !== '') {
      const form = {
        name: this.coachProfile.displayName,
        timestamp: moment().format(),
        message: review
      };
      this.diaryService.reviewMeal(this.patientUid, date, key, form)
      .then( ret => {
        this.review.nativeElement.value = '';
        console.log('review guardado');
        this.activityService.addActivityFeed(this.patientUid, date, key, 'mes', form.message);
      });
    } else  { console.log('no manda, vacio'); }
  }

  rate(rate: string, date: string, key: string) {
    const form = {
      rate: rate
    };
    this.diaryService.updateEntry(this.patientUid, date, key, form)
    .then( () => {
      console.log('meal has been rated');
      this.activityService.addActivityFeed(this.patientUid, date, key, 'review');
    });
  }

  checkClick() {
    this.check ? this.state = 'pending' : this.state = '';
  }

  changeState(state: string, date, key) {
    state === 'pending' ? state = 'ok' : state = 'pending';
    const form = {
      state: state
    };
    this.diaryService.updateEntry(this.patientUid, date, key, form)
    .then( () => {
      let add: boolean;
      state === 'pending' ? add = true : add = false;
      this.activityService.updatePendingReviewCount(this.patientUid, add)
      .then( ret => console.log(ret.snapshot.val()));
    });
  }

}
