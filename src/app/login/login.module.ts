import { ModuleWithProviders, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AlertModule } from 'ng2-bootstrap';

import { LoginComponent } from './login.component';

const homeRouting: ModuleWithProviders = RouterModule.forChild([
  {
    path: 'login',
    component: LoginComponent,
  }
]);

@NgModule({
  imports: [
    FormsModule,
    homeRouting,
    AlertModule.forRoot(),
  ],
  declarations: [
    LoginComponent
  ],
  providers: []
})
export class LoginModule {}
