import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaulineLeadershipComponent } from './pauline-leadership.component';

describe('PaulineLeadershipComponent', () => {
  let component: PaulineLeadershipComponent;
  let fixture: ComponentFixture<PaulineLeadershipComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaulineLeadershipComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaulineLeadershipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
