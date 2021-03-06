import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { AlertModule, DropdownModule } from 'ng2-bootstrap';
import { Chart } from 'chart.js';

import { ShowAuthedDirective } from './directives/show-authed.directive';
import { InputValueDirective } from './directives/input-value.directive';
import { ElasticTextarea } from './components/elastic-text-area.component';
import { ObjectIteratePipe } from './pipes/object-iterate.pipe';
import { MomentDatePipe } from './pipes/moment-date.pipe';
import { MomentFromNowPipe } from './pipes/moment-from-now.pipe';
import { FilterPipe } from './pipes/filter.pipe';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    AlertModule.forRoot(),
    DropdownModule.forRoot(),
  ],
  declarations: [
    ShowAuthedDirective,
    InputValueDirective,
    ObjectIteratePipe,
    MomentDatePipe,
    MomentFromNowPipe,
    FilterPipe,
    ElasticTextarea
  ],
  exports: [
    CommonModule,
    FormsModule,
    RouterModule,
    ShowAuthedDirective,
    InputValueDirective,
    ReactiveFormsModule,
    AlertModule,
    DropdownModule,
    ObjectIteratePipe,
    MomentDatePipe,
    MomentFromNowPipe,
    FilterPipe,
    ElasticTextarea
  ]
})
export class SharedModule {
  static forRoot() {
      return {
          ngModule: SharedModule,
          providers: [ObjectIteratePipe],
      };
   }
}
