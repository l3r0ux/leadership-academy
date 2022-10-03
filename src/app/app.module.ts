import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { TrainingTileComponent } from './pages/home/components/training-tile/training-tile.component';
import { LeadershipAcademyComponent } from './pages/leadership-academy/leadership-academy.component';
import { PaulineLeadershipComponent } from './pages/pauline-leadership/pauline-leadership.component';
import { TheForumComponent } from './pages/the-forum/the-forum.component';
import { AdminPanelComponent } from './pages/admin-panel/admin-panel.component';
import { ApplicationsComponent } from './pages/admin-panel/applications/applications.component';
import { TheForumAdminComponent } from './pages/admin-panel/the-forum/the-forum.component';
import { LeadershipAcademyAdminComponent } from './pages/admin-panel/leadership-academy/leadership-academy.component';
import { PaulineLeadershipAdminComponent } from './pages/admin-panel/pauline-leadership/pauline-leadership.component';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { AngularFireModule } from '@angular/fire/compat';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    TrainingTileComponent,
    LeadershipAcademyComponent,
    PaulineLeadershipComponent,
    TheForumComponent,
    AdminPanelComponent,
    ApplicationsComponent,
    TheForumAdminComponent,
    LeadershipAcademyAdminComponent,
    PaulineLeadershipAdminComponent
  ],
  imports: [
    AngularFireModule.initializeApp(environment.firebase),
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    BrowserAnimationsModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore())
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
