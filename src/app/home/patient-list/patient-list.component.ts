import { Component, OnInit } from '@angular/core';

import { PatientListService } from '../../shared';

@Component({
  selector: 'app-patient-list',
  templateUrl: './patient-list.component.html',
  styleUrls: ['./patient-list.component.css']
})
export class PatientListComponent implements OnInit {

  patients: any;
  prueba = ['pepe', 'juanjo', 'jose'];

  constructor(
    public plService: PatientListService
  ) {
    this.patients = this.plService.patientList;
    console.log(this.patients);
    console.log(this.prueba);
  }

  ngOnInit() {
    this.patients
    .subscribe( patients => {
      console.log(patients);
    });
  }

}
