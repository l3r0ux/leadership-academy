import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTeachingMaterialComponent } from './add-teaching-material.component';

describe('AddTeachingMaterialComponent', () => {
  let component: AddTeachingMaterialComponent;
  let fixture: ComponentFixture<AddTeachingMaterialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddTeachingMaterialComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddTeachingMaterialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
