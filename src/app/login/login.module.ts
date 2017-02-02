import { ModuleWithProviders, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { LoginComponent } from './login.component';
import {
  SharedModule,
  NoAuthGuard
} from '../shared';

const homeRouting: ModuleWithProviders = RouterModule.forChild([
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [NoAuthGuard]
  },
  {
    path: 'register',
    component: LoginComponent,
    canActivate: [NoAuthGuard]
  },
  {
    path: 'reset',
    component: LoginComponent,
    canActivate: [NoAuthGuard]
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
