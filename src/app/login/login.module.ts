import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { LoginComponent } from './login.component';

const homeRouting: ModuleWithProviders = RouterModule.forChild([
  {
    path: 'login',
    component: LoginComponent,
  }
]);

@NgModule({
  imports: [
    homeRouting,
  ],
  declarations: [
    LoginComponent
  ],
  providers: []
})
export class LoginModule {}
