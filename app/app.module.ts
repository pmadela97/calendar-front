import { LOCALE_ID, NgModule } from '@angular/core';
import localePl from '@angular/common/locales/pl';
import { DatePipe, registerLocaleData } from '@angular/common';
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
import { ErrorInterceptor } from './modules/helpers/interceptors/error.interceptor';
import { AdminNavbarComponent } from './modules/admin/admin-navbar/admin-navbar.component';
import { FooterComponent } from './modules/shared/components/footer/footer.component';
import { ErrorPageComponent } from './modules/shared/components/error-page/error-page.component';
import { AdminPanelComponent } from './modules/admin/admin-panel/admin-panel.component';
import { UserListComponent } from './modules/admin/admin-panel/user-list/user-list.component';
import { TokenInterceptor } from './modules/helpers/interceptors/token.interceptor';
import { AuthenticationService } from './modules/helpers/services/auth/authentication.service';
import { JwtService } from './modules/helpers/services/auth/jwt-service';
import { LoginGuard } from './modules/helpers/services/auth/login-guard';
import { HomeGuard } from './modules/helpers/services/home-guard';
import { LogoutComponent } from './modules/shared/components/logout/logout.component';
import { UserDetailsComponent } from './modules/admin/admin-panel/user-details/user-details.component';
import { NewUserPanelComponent } from './modules/admin/new-user-panel/new-user-panel.component';
import { UserComponent } from './modules/user/user.component';
import { TaskListComponent } from './modules/user/task-list/task-list.component';
import { UserSettingsComponent } from './modules/user/user-settings/user-settings.component';
import { TaskDetailsComponent } from './modules/user/task-details/task-details.component';
registerLocaleData(localePl);


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginPanelComponent,
    RegistrationPanelComponent,
    AdminComponent,
    AdminNavbarComponent,
    FooterComponent,
    ErrorPageComponent,
    AdminPanelComponent,
    UserListComponent,
    LogoutComponent,
    UserDetailsComponent,
    NewUserPanelComponent,
    UserComponent,
    TaskListComponent,
    UserSettingsComponent,
    TaskDetailsComponent,
  
    ],
    
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    

  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    { provide: LOCALE_ID, useValue:"pl-PL" },
    AuthenticationService,
    LoginGuard,
    HomeGuard,
    JwtService,
    ErrorInterceptor,
    DatePipe
    
    

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
