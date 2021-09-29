import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './modules/home/home.component';
import { LoginPanelComponent } from './modules/home/login-panel/login-panel.component';
import { RegistrationPanelComponent } from './modules/home/registration-panel/registration-panel.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminComponent } from './modules/admin/admin.component';
import { LoginUserPanelComponent } from './modules/shared/login-user-panel/login-user-panel.component';
import { ErrorInterceptor } from './modules/helpers/interceptors/error.interceptor';
import { AdminNavbarComponent } from './modules/admin/admin-navbar/admin-navbar.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginPanelComponent,
    RegistrationPanelComponent,
    AdminComponent,
    LoginUserPanelComponent,
    AdminNavbarComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule

  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
