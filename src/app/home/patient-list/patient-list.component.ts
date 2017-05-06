import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import 'rxjs/add/operator/take';

import { PatientListService, ActivityService, ProfileService } from '../../shared';

@Component({
  selector: 'app-patient-list',
  templateUrl: './patient-list.component.html',
  styleUrls: ['./patient-list.component.css']
})
export class PatientListComponent implements OnInit {

  patients: any;
  pendingReviews: any;
  profile: any;
  patientTodo = {};

  constructor(
    private plService: PatientListService,
    private router: Router,
    private activityService: ActivityService,
    private profileService: ProfileService
  ) {
    this.patients = this.plService.patientList;
    this.pendingReviews = this.activityService.getPendingReviews();
    this.profileService.getProfile().subscribe(prof => {
      this.profile = prof;
    });
  }

  ngOnInit() {
    const list = this.patients
    .take(1)
    .subscribe( pList => {
      this.router.navigate(['/dashboard', pList[0].$key, 'diary']);
    });
  }

  // esta funcion la usaba antes de implementar [routerLink] en el template
  // le saque el segundo paramentro diary porque en el module, ya lo redirijo en caso que quede vacio
  // tambien saque el paramentro displayName porque no lo termine usando
  // La dejo a modo de ejemplo de como se podria hacer
  getPatient(patientUid, displayName) {
    this.router.navigate(['/dashboard', patientUid, 'diary', {displayName: displayName}]);
  }

}
