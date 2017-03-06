import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { DiaryService } from '../../../shared';

@Component({
  selector: 'app-diary',
  templateUrl: './diary.component.html',
  styleUrls: ['./diary.component.css']
})
export class DiaryComponent implements OnInit {

  patient: any;
  diary: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private diaryService: DiaryService
  ) { }

  ngOnInit() {
    this.route.parent.params.forEach((params: Params) => { // pongo parent porque es una ruta previa
      console.log(params);
      const id = params['id'];
      this.patient = id;
      this.diary = this.diaryService.getDiary(this.patient);
      console.log(this.diary);
      this.diary.subscribe( diary => {
        console.log(diary);
      });
    });
  }

}
