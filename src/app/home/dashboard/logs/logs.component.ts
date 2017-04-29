import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import * as Chart from 'chart.js';
import * as moment from 'moment';

import { WeightService, PatientProfileService, ProfileService } from '../../../shared';

@Component({
  selector: 'app-logs',
  templateUrl: './logs.component.html',
  styleUrls: ['./logs.component.css']
})
export class LogsComponent implements OnInit {

  chart: any;
  // lineChart: any;
  weightLogs: any;
  data: Array<any> = new Array();
  labels: Array<any> = new Array();
  patientProfile: any;
  actual: any;
  @ViewChild('lineCanvas') lineCanvas;


  constructor(
    private wieghtService: WeightService,
    private profileService: ProfileService,
    private patientService: PatientProfileService,
    private route: ActivatedRoute,
  ) {}

  ngOnInit() {
    this.route.parent.params.forEach((params: Params) => {
      const patientUid = params['id'];
        this.patientService.getProfile(patientUid).then(patient => {
          this.patientProfile = patient.val();
          this.wieghtService.getWeightLogs(patientUid).subscribe(data => {
            this.weightLogs = data;
            console.log(this.weightLogs);
            this.actualWeight(this.weightLogs);
            this.prepareChartData(this.weightLogs);
            this.buildGraph(this.data, this.labels);
          });
        });
    });
  }

  actualWeight(array) {
    if (array.length) {
      this.actual = +array[array.length - 1].log;
    } else {
      this.actual = this.patientProfile.initialWeight;
    }
  }

  prepareChartData(data: Array<any>) {
    this.data = [];
    this.labels = [];
    if (data.length) {
      console.log(data.length);
      data.forEach( log => {
        this.data.push(log.log);
        this.labels.push(moment(log.timestamp).format('D/M'));
      });
      console.log(this.data, this.labels);
    }
  }

  buildGraph(data, labels) {
    if (data.length && labels.length ) {
      this.chart = new Chart(this.lineCanvas.nativeElement, {
        type: 'line',
        data: {
          labels: labels,
          datasets: [
            {
              label: 'Log de peso',
              fill: true,
              backgroundColor: 'rgba(75,192,192,0.4)',
              borderColor: 'rgba(75,192,192,1)',
              borderCapStyle: 'butt',
              borderDash: [],
              borderDashOffset: 0.0,
              borderJoinStyle: 'miter',
              pointBorderColor: 'rgba(75,192,192,1)',
              pointBackgroundColor: '#fff',
              pointBorderWidth: 1,
              pointHoverRadius: 5,
              pointHoverBackgroundColor: 'rgba(75,192,192,1)',
              pointHoverBorderColor: 'rgba(220,220,220,1)',
              pointHoverBorderWidth: 2,
              pointRadius: 1,
              pointHitRadius: 10,
              data: data,
              spanGaps: false,
            }
          ]
        },
        options: {
          legend: {
            display: false
          }
        }
      });
    }
  }

}
