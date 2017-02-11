import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ProfileComponent } from './profile.component';
import {
  SharedModule,
  AuthGuard
} from '../shared';

const profileRouting: ModuleWithProviders = RouterModule.forChild([
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthGuard]
  }
]);

@NgModule({
  imports: [
    SharedModule,
    profileRouting,
  ],
  declarations: [
    ProfileComponent
  ],
  providers: [
    AuthGuard
  ]
})
export class ProfileModule {}
