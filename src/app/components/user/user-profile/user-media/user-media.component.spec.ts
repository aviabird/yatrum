/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { UserMediaComponent } from './user-media.component';

describe('UserMediaComponent', () => {
  let component: UserMediaComponent;
  let fixture: ComponentFixture<UserMediaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserMediaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserMediaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
