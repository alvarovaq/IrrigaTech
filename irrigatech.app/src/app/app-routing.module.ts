import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from '@modules/home/home.component';

const routes: Routes = [
  {path: '', component: HomeComponent, loadChildren: () => import('@modules/home/home.module').then(x => x.HomeModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
