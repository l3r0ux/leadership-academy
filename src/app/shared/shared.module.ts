import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from '../app-routing.module';
import { FooterComponent } from './components/footer/footer.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { VideoCarouselComponent } from './components/video-carousel/video-carousel.component';
import { ExpansionPanelComponent } from './components/expansion-panel/expansion-panel.component';
import { ConferenceComponent } from './components/conference/conference.component';
import { SessionComponent } from './components/session/session.component';
import { ModalComponent } from './components/modal/modal.component';
import { PasswordResetComponent } from './components/password-reset/password-reset.component';

const exports = [
  FooterComponent,
  NavbarComponent,
  VideoCarouselComponent,
  ExpansionPanelComponent,
  ConferenceComponent,
  SessionComponent,
  ModalComponent,
  PasswordResetComponent
]

@NgModule({
  declarations: exports,
  imports: [
    CommonModule,
    AppRoutingModule
  ],
  exports: exports
})
export class SharedModule { }
