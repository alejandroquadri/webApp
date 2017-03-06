import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { HomeComponent } from './home.component';
import { PatientListComponent } from './patient-list/patient-list.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DiaryComponent } from './diary/diary.component';
import { ChatComponent } from './chat/chat.component';
import {
  SharedModule,
  AuthGuard
} from '../shared';

const homeRouting: ModuleWithProviders = RouterModule.forChild([
  {
    path: '',
    component: HomeComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'dashboard/:id',
        component: DashboardComponent,
      }
    ]
  }
]);

@NgModule({
  imports: [
    homeRouting,
    SharedModule
  ],
  declarations: [
    HomeComponent,
    PatientListComponent,
    DiaryComponent,
    ChatComponent,
    DashboardComponent
  ],
  providers: [
    AuthGuard
  ]
})
export class HomeModule {}
