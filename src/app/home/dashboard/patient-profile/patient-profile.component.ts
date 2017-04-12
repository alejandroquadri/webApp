import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { PatientProfileService } from '../../../shared';
import * as moment from 'moment';

@Component({
  moduleId: module.id,
  selector: 'app-patient-profile',
  templateUrl: 'patient-profile.component.html',
  styleUrls: ['./patient-profile.component.css']
})
export class PatientProfileComponent implements OnInit {

  patientProfile: any;
  age: any;
  avatar = './assets/images/smiley-cyrus.jpg';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private patientProfileService: PatientProfileService
  ) {
    this.route.parent.params.forEach((params: Params) => {
      this.patientProfileService.getProfile(params['id'])
      .then( snapshot => {
        this.patientProfile =  snapshot.val();
        this.age = this.calcAge(this.patientProfile.birthDate);
      });
    });
  }

  ngOnInit() {

  }

  calcAge(date: string) {
    const today = moment();
    const birthday = moment(date);
    return today.diff(birthday, 'years');
  }


}
