import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PasswordResetRequestFailedComponent } from './password-reset-request-failed.component';

describe('PasswordResetRequestFailedComponent', () => {
  let component: PasswordResetRequestFailedComponent;
  let fixture: ComponentFixture<PasswordResetRequestFailedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PasswordResetRequestFailedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PasswordResetRequestFailedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
