/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ListaEspecialidadesSacarComponent } from './lista-especialidades-sacar.component';

describe('ListaEspecialidadesSacarComponent', () => {
  let component: ListaEspecialidadesSacarComponent;
  let fixture: ComponentFixture<ListaEspecialidadesSacarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListaEspecialidadesSacarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaEspecialidadesSacarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
