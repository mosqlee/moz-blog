import { LoginService } from './login/login.service';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule, Http } from '@angular/http';
import {httpInterceptorProviders} from './http-interceptors/index';

import { NgZorroAntdModule } from 'ng-zorro-antd';
import { AppComponent } from './app.component';
import { appRoute } from './app.routes';
import { LoginComponent } from './login/login.component';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import {LoginGard} from './gard/login.gard';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(appRoute),
    NgZorroAntdModule.forRoot(),
    HttpModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [LoginService, LoginGard, httpInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
