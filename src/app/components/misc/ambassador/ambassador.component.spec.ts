/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { AmbassadorComponent } from './ambassador.component';

describe('AmbassadorComponent', () => {
  let component: AmbassadorComponent;
  let fixture: ComponentFixture<AmbassadorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AmbassadorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AmbassadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
