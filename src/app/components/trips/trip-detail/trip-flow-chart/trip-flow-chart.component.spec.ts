/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { TripFlowChartComponent } from './trip-flow-chart.component';

describe('TripFlowChartComponent', () => {
  let component: TripFlowChartComponent;
  let fixture: ComponentFixture<TripFlowChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TripFlowChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TripFlowChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
