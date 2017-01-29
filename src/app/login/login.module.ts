import { ModuleWithProviders, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { LoginComponent } from './login.component';
import { SharedModule } from '../shared';

const homeRouting: ModuleWithProviders = RouterModule.forChild([
  {
    path: 'login',
    component: LoginComponent,
  }
]);

@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    homeRouting,
    SharedModule
  ],
  declarations: [
    LoginComponent
  ],
  providers: []
})
export class LoginModule {}
