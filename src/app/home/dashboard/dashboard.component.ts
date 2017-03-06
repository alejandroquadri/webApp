import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { DiaryService } from '../../shared';


@Component({
  moduleId: module.id,
  selector: 'app-dasboard',
  templateUrl: 'dashboard.component.html'
})
export class DashboardComponent implements OnInit {

  patient: any;
  diary: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private diaryService: DiaryService
  ) {}

  ngOnInit() {
    this.route.params.forEach((params: Params) => {
      console.log(params);
      const id = params['id']; // el + sirve en javascript para convertir un string en numero
      this.patient = id;
      this.diary = this.diaryService.getDiary(this.patient);
      console.log(this.diary);
      this.diary.subscribe( diary => {
        console.log(diary);
      });
    });
  }

  nav(dir) {
    this.router.navigate(['/dashboard', this.patient, dir]);
  }
}
