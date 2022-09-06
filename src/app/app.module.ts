import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';

import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { TrainingTileComponent } from './pages/home/components/training-tile/training-tile.component';
import { LeadershipAcademyComponent } from './pages/leadership-academy/leadership-academy.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    TrainingTileComponent,
    LeadershipAcademyComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
