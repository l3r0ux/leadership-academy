import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LeadershipAcademyComponent } from './pages/leadership-academy/leadership-academy.component';
import { PaulineLeadershipComponent } from './pages/pauline-leadership/pauline-leadership.component';
import { TheForumComponent } from './pages/the-forum/the-forum.component';

const routes: Routes = [
  { path: '', component:  HomeComponent },
  { path: 'leadership-academy', component:  LeadershipAcademyComponent },
  { path: 'pauline-leadership', component:  PaulineLeadershipComponent },
  { path: 'the-forum', component:  TheForumComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
