import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './modules/admin/admin.component';
import { LoginGuard } from './modules/helpers/services/auth/login-guard';
import { HomeGuard } from './modules/helpers/services/home-guard';
import { HomeComponent } from './modules/home/home.component';
import { ErrorPageComponent } from './modules/shared/components/error-page/error-page.component';
import { LogoutComponent } from './modules/shared/components/logout/logout.component';
import { UserComponent } from './modules/user/user.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent,canActivate: [HomeGuard]},
  { path: 'user', component: UserComponent, canActivate: [LoginGuard] },
  { path: 'admin', component: AdminComponent, canActivate: [LoginGuard]  },
  { path: 'error', component: ErrorPageComponent,},
  { path: 'logout', component: LogoutComponent},
  { path: '',   redirectTo: '/home', pathMatch: 'full' }, ]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
