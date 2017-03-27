import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { PatientListService } from '../../shared';

@Component({
  selector: 'app-patient-list',
  templateUrl: './patient-list.component.html',
  styleUrls: ['./patient-list.component.css']
})
export class PatientListComponent implements OnInit {

  patients: any;

  constructor(
    private plService: PatientListService,
    private router: Router
  ) {
    this.patients = this.plService.patientList;
  }

  ngOnInit() {}

  getPatient(patientUid, displayName) {
    this.router.navigate(['/dashboard', patientUid, 'diary', {displayName: displayName}]);
  }

}
