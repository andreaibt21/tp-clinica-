/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { GestionTurnoPacComponent } from './gestion-turno-pac.component';

describe('GestionTurnoPacComponent', () => {
  let component: GestionTurnoPacComponent;
  let fixture: ComponentFixture<GestionTurnoPacComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GestionTurnoPacComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionTurnoPacComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
