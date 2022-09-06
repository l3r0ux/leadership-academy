import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LeadershipAcademyComponent } from './pages/leadership-academy/leadership-academy.component';

const routes: Routes = [
  { path: '', component:  HomeComponent },
  { path: 'leadership-academy', component:  LeadershipAcademyComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
