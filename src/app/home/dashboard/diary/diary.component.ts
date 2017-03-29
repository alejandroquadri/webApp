import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import * as moment from 'moment';

import { ProfileService, DiaryService } from '../../../shared';

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

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private diaryService: DiaryService,
    private profileService: ProfileService
  ) {
    this.profileService.fireProfile.subscribe( profile => {
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
    const form = {
      name: this.coachProfile.displayName,
      timestamp: moment().format(),
      message: review
    };
    this.diaryService.reviewMeal(this.patientUid, date, key, form)
    .then( ret => {
      this.review.nativeElement.value = '';
      console.log('review guardado');
    });
  }

  rate(rate: string, date: string, key: string) {
    const form = {
      rate: rate
    };
    this.diaryService.rateMeal(this.patientUid, date, key, form)
    .then( ret => console.log('meal has been rated', ret));
  }

}