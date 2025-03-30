import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './shared/guards/auth.guard';
import { LoginComponent } from './auth/login/login.component';
import { OsListComponent } from './os/os-list/os-list.component';
import { OsDetailComponent } from './os/os-detail/os-detail.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'os', component: OsListComponent, canActivate: [AuthGuard] },
  { path: 'os/new', component: OsDetailComponent, canActivate: [AuthGuard] },
  { path: 'os/:id', component: OsDetailComponent, canActivate: [AuthGuard] },
  { path: '', redirectTo: '/os', pathMatch: 'full' },
  { path: '**', redirectTo: '/os' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
