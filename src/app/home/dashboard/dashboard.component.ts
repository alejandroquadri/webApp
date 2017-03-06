import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  moduleId: module.id,
  selector: 'app-dasboard',
  templateUrl: 'dashboard.component.html'
})
export class DashboardComponent implements OnInit {

  patient: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit() {
    this.route.params.forEach((params: Params) => {
      console.log(params);
      const id = params['id']; // el + sirve en javascript para convertir un string en numero
      this.patient = id;
    });
  }

  nav(dir) {
    this.router.navigate(['/dashboard', this.patient, dir]);
  }
}
