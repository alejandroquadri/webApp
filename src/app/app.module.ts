import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AlertModule } from 'ng2-bootstrap';
import { AngularFireModule, AuthProviders, AuthMethods } from 'angularfire2';

import { AppComponent } from './app.component';
import { HomeModule } from './home/home.module';
import { AuthModule } from './auth/auth.module';
import {
  SharedModule,
  AuthService,
  AuthGuard,
  NoAuthGuard,
  HeaderComponent,
  FooterComponent
} from './shared';

// settings AF2
export const firebaseConfig = {
  apiKey: 'AIzaSyC9EFx_1rQDM0YOleEC-CstB58D0JMj0pA',
  authDomain: 'dietapp-9f200.firebaseapp.com',
  databaseURL: 'https://dietapp-9f200.firebaseio.com',
  storageBucket: 'dietapp-9f200.appspot.com',
  messagingSenderId: '1075458661299'
};

// esto le dice a AF2 que voy a usar Email & Password para autenticacion
const myFirebaseAuthConfig = {
  provider: AuthProviders.Password,
  method: AuthMethods.Password
};

// el array del router queda vacio porque se definen las rutas en cada uno de los modulos en cada carpeta
const rootRouting: ModuleWithProviders = RouterModule.forRoot([], { useHash: true });

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    rootRouting,
    AlertModule.forRoot(),
    AngularFireModule.initializeApp(firebaseConfig, myFirebaseAuthConfig),
    SharedModule,
    AuthModule,
    HomeModule,
  ],
  providers: [
    AuthService,
    AuthGuard,
    NoAuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
