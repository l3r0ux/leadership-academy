import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignUpFailComponent } from './sign-up-fail.component';

describe('SignUpFailComponent', () => {
  let component: SignUpFailComponent;
  let fixture: ComponentFixture<SignUpFailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SignUpFailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SignUpFailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
