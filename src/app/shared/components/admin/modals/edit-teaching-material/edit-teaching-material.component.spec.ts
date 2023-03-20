import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTeachingMaterialComponent } from './edit-teaching-material.component';

describe('EditTeachingMaterialComponent', () => {
  let component: EditTeachingMaterialComponent;
  let fixture: ComponentFixture<EditTeachingMaterialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditTeachingMaterialComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditTeachingMaterialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
