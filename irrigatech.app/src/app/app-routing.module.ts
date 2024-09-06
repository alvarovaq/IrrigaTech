import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@core/guards/auth.guard';
import { AutoLoginGuard } from '@core/guards/auto-login.guard';
import { HomeComponent } from '@modules/home/home.component';
import { LoginComponent } from '@modules/login/login.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent, loadChildren: () => import('@modules/login/login.module').then(x => x.LoginModule), canActivate: [AutoLoginGuard]},
  {path: '', component: HomeComponent, loadChildren: () => import('@modules/home/home.module').then(x => x.HomeModule), canActivate: [AuthGuard]},
  {path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
