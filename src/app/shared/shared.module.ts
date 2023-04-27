import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from '../app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';

import { FooterComponent } from './components/footer/footer.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { VideoComponent } from './components/video/video.component';
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
import { SignUpComponent } from './components/modals/sign-up/sign-up.component';
import { SignUpSuccessComponent } from './components/modals/sign-up-success/sign-up-success.component';
import { SignUpFailComponent } from './components/modals/sign-up-fail/sign-up-fail.component';
import { SnackbarComponent } from './components/admin/snackbar/snackbar.component';
import { AddCountryComponent } from './components/admin/modals/add-country/add-country.component';
import { PasswordResetRequestSuccessComponent } from './components/modals/password-reset-request-success/password-reset-request-success.component';
import { PasswordResetRequestFailedComponent } from './components/modals/password-reset-request-failed/password-reset-request-failed.component';
import { PaulineStudentsComponent } from './components/admin/pauline-students/pauline-students.component';
import { EditVideoComponent } from './components/admin/modals/edit-video/edit-video.component';
import { EditTeachingMaterialComponent } from './components/admin/modals/edit-teaching-material/edit-teaching-material.component';

const components = [
  TabsComponent,
  FooterComponent,
  NavbarComponent,
  VideoComponent,
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
  ApplicationFailedComponent,
  SignUpComponent,
  SignUpSuccessComponent,
  SignUpFailComponent,
  SnackbarComponent,
  AddCountryComponent,
  PasswordResetRequestSuccessComponent,
  PasswordResetRequestFailedComponent,
  PaulineStudentsComponent,
  EditVideoComponent,
  EditTeachingMaterialComponent
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
