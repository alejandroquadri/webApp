import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import 'rxjs/add/operator/take';

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
    this.patients = this.plService.getPatientList();
  }

  ngOnInit() {
    const list = this.patients
    .take(1)
    .subscribe( pList => {
      this.router.navigate(['/dashboard', pList[0].uid, 'diary', {displayName: pList[0].displayName}]);
    });
  }

  getPatient(patientUid, displayName) {
    this.router.navigate(['/dashboard', patientUid, 'diary', {displayName: displayName}]);
  }

}
