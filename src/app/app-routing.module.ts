import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminPanelComponent } from './pages/admin-panel/admin-panel.component';
import { HomeComponent } from './pages/home/home.component';
import { LeadershipAcademyComponent } from './pages/leadership-academy/leadership-academy.component';
import { PaulineLeadershipComponent } from './pages/pauline-leadership/pauline-leadership.component';
import { TheForumComponent } from './pages/the-forum/the-forum.component';
import { TheForumAdminComponent } from './pages/admin-panel/the-forum/the-forum.component';
import { LeadershipAcademyAdminComponent } from './pages/admin-panel/leadership-academy/leadership-academy.component';
import { PaulineLeadershipAdminComponent } from './pages/admin-panel/pauline-leadership/pauline-leadership.component';

const routes: Routes = [
  { path: '', component:  HomeComponent },
  { path: 'leadership-academy', component:  LeadershipAcademyComponent },
  { path: 'pauline-leadership', component:  PaulineLeadershipComponent },
  { path: 'the-forum', component:  TheForumComponent },
  { path: 'admin', component:  AdminPanelComponent, children: [
    { path: 'the-forum', component:  TheForumAdminComponent },
    { path: 'leadership-academy', component:  LeadershipAcademyAdminComponent },
    { path: 'pauline-leadership', component:  PaulineLeadershipAdminComponent },
  ] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
