import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {DashBoardActivityComponent} from '../dashboard/dashBoard-activity.component';

describe('DashboardComponent', () => {
  let component: DashBoardActivityComponent;
  let fixture: ComponentFixture<DashBoardActivityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashBoardActivityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashBoardActivityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
