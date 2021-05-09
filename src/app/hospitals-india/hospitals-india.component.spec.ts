import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HospitalsIndiaComponent } from './hospitals-india.component';

describe('HospitalsIndiaComponent', () => {
  let component: HospitalsIndiaComponent;
  let fixture: ComponentFixture<HospitalsIndiaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HospitalsIndiaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HospitalsIndiaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
