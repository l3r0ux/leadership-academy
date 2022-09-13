import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TheForumComponent } from './the-forum.component';

describe('TheForumComponent', () => {
  let component: TheForumComponent;
  let fixture: ComponentFixture<TheForumComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TheForumComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TheForumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
