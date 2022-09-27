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
import { PasswordResetComponent } from './components/modals/password-reset/password-reset.component';
import { PasswordResetRequestComponent } from './components/modals/password-reset-request/password-reset-request.component';
import { LoginComponent } from './components/modals/login/login.component';
import { ApplyComponent } from './components/modals/apply/apply.component';
import { TabsComponent } from './components/tabs/tabs.component';
import { ApplicationComponent } from './components/admin/application/application.component';
import { SessionsAdminComponent } from './components/admin/sessions/sessions.component';
import { ConferencesAdminComponent } from './components/admin/conferences/conferences.component';

const components = [
  TabsComponent,
  FooterComponent,
  NavbarComponent,
  VideoCarouselComponent,
  ExpansionPanelComponent,
  ConferenceComponent,
  SessionComponent,
  ModalComponent,
  PasswordResetComponent,
  PasswordResetRequestComponent,
  LoginComponent,
  ApplyComponent,
  ApplicationComponent,
  SessionsAdminComponent,
  ConferencesAdminComponent
]

@NgModule({
  declarations: components,
  imports: [
    CommonModule,
    AppRoutingModule
  ],
  exports: components
})
export class SharedModule { }
