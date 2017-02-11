import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { AlertModule, DropdownModule } from 'ng2-bootstrap';

import { ShowAuthedDirective } from './directives/show-authed.directive';

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
    ShowAuthedDirective
  ],
  exports: [
    CommonModule,
    FormsModule,
    RouterModule,
    ShowAuthedDirective,
    ReactiveFormsModule,
    AlertModule,
    DropdownModule
  ]
})
export class SharedModule {}
