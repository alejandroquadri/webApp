import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  moduleId: module.id,
  selector: 'app-dasboard',
  templateUrl: 'dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  patient: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit() {
    this.route.params.forEach((params: Params) => {
      const id = params['id']; // el + sirve en javascript para convertir un string en numero
      this.patient = id;
    });
  }

  // esta funcion no sirve mas, pase la funcionalidad al template, al igual que en el ashboard
  // la dejo para recordar como se hacia
  nav(dir) {
    this.router.navigate(['/dashboard', this.patient, dir]);
  }
}
