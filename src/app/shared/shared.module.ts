import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { AlertModule, DropdownModule } from 'ng2-bootstrap';

import { ShowAuthedDirective } from './directives/show-authed.directive';
import { ObjectIteratePipe } from './pipes/object-iterate.pipe';
import { MomentDatePipe } from './pipes/moment-date.pipe';
import { MomentFromNowPipe } from './pipes/moment-from-now.pipe';

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
    ObjectIteratePipe,
    MomentDatePipe,
    MomentFromNowPipe
  ],
  exports: [
    CommonModule,
    FormsModule,
    RouterModule,
    ShowAuthedDirective,
    ReactiveFormsModule,
    AlertModule,
    DropdownModule,
    ObjectIteratePipe,
    MomentDatePipe,
    MomentFromNowPipe
  ]
})
export class SharedModule {
  static forRoot() {
      return {
          ngModule: SharedModule,
          providers: [],
      };
   }
}
