import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaulineStudentsComponent } from './pauline-students.component';

describe('PaulineStudentsComponent', () => {
  let component: PaulineStudentsComponent;
  let fixture: ComponentFixture<PaulineStudentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaulineStudentsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaulineStudentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
