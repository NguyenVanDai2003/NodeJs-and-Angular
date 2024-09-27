import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Sp1Component } from './sp1.component';

describe('Sp1Component', () => {
  let component: Sp1Component;
  let fixture: ComponentFixture<Sp1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Sp1Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Sp1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
