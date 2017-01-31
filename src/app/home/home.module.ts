import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { HomeComponent } from './home.component';
import {
  SharedModule,
  AuthGuard
} from '../shared';
import { AuthResolver } from './auth-resolve.service';

const homeRouting: ModuleWithProviders = RouterModule.forChild([
  {
    path: '',
    component: HomeComponent,
    canActivate: [AuthGuard]
  }
]);

@NgModule({
  imports: [
    homeRouting,
  ],
  declarations: [
    HomeComponent
  ],
  providers: [
    AuthResolver,
    AuthGuard
  ]
})
export class HomeModule {}
