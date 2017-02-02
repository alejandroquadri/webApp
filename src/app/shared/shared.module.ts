import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { ShowAuthedDirective } from './directives/show-authed.directive';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
  ],
  declarations: [
    ShowAuthedDirective
  ],
  exports: [
    CommonModule,
    FormsModule,
    RouterModule,
    ShowAuthedDirective
  ]
})
export class SharedModule {}
