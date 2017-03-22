import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { HomeComponent } from './home.component';
import { PatientListComponent } from './patient-list/patient-list.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DiaryComponent } from './dashboard/diary/diary.component';
import { ChatComponent } from './dashboard/chat/chat.component';
import { LogsComponent } from './dashboard/logs/logs.component';
import { PatientProfileComponent } from './dashboard/patient-profile/patient-profile.component';

import {
  SharedModule,
  AuthGuard,
  ObjectIteratePipe
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
        children: [
          {
            path: 'diary',
            component: DiaryComponent,
          },
          {
            path: 'logs',
            component: LogsComponent,
          },
          {
            path: 'patient-profile',
            component: PatientProfileComponent,
          }
        ]
      }
    ]
  }
]);

@NgModule({
  imports: [
    homeRouting,
    SharedModule.forRoot()
  ],
  declarations: [
    HomeComponent,
    PatientListComponent,
    DiaryComponent,
    ChatComponent,
    DashboardComponent,
    LogsComponent,
    PatientProfileComponent
  ],
  providers: [
    AuthGuard
  ]
})
export class HomeModule {}
