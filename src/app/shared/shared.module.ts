import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from '../app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';

import { FooterComponent } from './components/footer/footer.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { VideoCarouselComponent } from './components/video-carousel/video-carousel.component';
import { ExpansionPanelComponent } from './components/expansion-panel/expansion-panel.component';
import { ConferenceComponent } from './components/conference/conference.component';
import { SessionComponent } from './components/session/session.component';
import { ModalComponent } from './components/modal/modal.component';
import { PasswordResetRequestComponent } from './components/modals/password-reset-request/password-reset-request.component';
import { LoginComponent } from './components/modals/login/login.component';
import { ApplyComponent } from './components/modals/apply/apply.component';
import { TabsComponent } from './components/tabs/tabs.component';
import { SessionsAdminComponent } from './components/admin/sessions/sessions.component';
import { ConferencesAdminComponent } from './components/admin/conferences/conferences.component';
import { AddConferenceComponent } from './components/admin/modals/add-conference/add-conference.component';
import { AddImagesComponent } from './components/admin/modals/add-images/add-images.component';
import { AddSessionComponent } from './components/admin/modals/add-session/add-session.component';
import { AddTeachingMaterialComponent } from './components/admin/modals/add-teaching-material/add-teaching-material.component';
import { AddVideoComponent } from './components/admin/modals/add-video/add-video.component';
import { DeleteConfirmationComponent } from './components/admin/modals/delete-confirmation/delete-confirmation.component';
import { RejectApplicationComponent } from './components/admin/modals/reject-application/reject-application.component';
import { AcceptApplicationComponent } from './components/admin/modals/accept-application/accept-application.component';
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';
import { ErrorComponent } from './components/modals/error/error.component';
import { ApplicationSuccessComponent } from './components/modals/application-success/application-success.component';
import { ApplicationFailedComponent } from './components/modals/application-failed/application-failed.component';

const components = [
  TabsComponent,
  FooterComponent,
  NavbarComponent,
  VideoCarouselComponent,
  ExpansionPanelComponent,
  ConferenceComponent,
  SessionComponent,
  ModalComponent,
  PasswordResetRequestComponent,
  LoginComponent,
  ApplyComponent,
  SessionsAdminComponent,
  ConferencesAdminComponent,
  AddConferenceComponent,
  AddImagesComponent,
  AddSessionComponent,
  AddTeachingMaterialComponent,
  AddVideoComponent,
  DeleteConfirmationComponent,
  RejectApplicationComponent,
  AcceptApplicationComponent,
  LoadingSpinnerComponent,
  ErrorComponent,
  ApplicationSuccessComponent,
  ApplicationFailedComponent
]

@NgModule({
  declarations: components,
  imports: [
    CommonModule,
    AppRoutingModule,
    ReactiveFormsModule,
  ],
  exports: components
})
export class SharedModule { }
