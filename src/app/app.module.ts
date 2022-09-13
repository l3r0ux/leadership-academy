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

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    TrainingTileComponent,
    LeadershipAcademyComponent,
    PaulineLeadershipComponent,
    TheForumComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
