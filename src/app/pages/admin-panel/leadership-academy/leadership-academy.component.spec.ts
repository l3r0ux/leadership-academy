import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeadershipAcademyComponent } from './leadership-academy.component';

describe('LeadershipAcademyComponent', () => {
  let component: LeadershipAcademyComponent;
  let fixture: ComponentFixture<LeadershipAcademyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LeadershipAcademyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LeadershipAcademyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
