import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicationFailedComponent } from './application-failed.component';

describe('ApplicationFailedComponent', () => {
  let component: ApplicationFailedComponent;
  let fixture: ComponentFixture<ApplicationFailedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApplicationFailedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApplicationFailedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
