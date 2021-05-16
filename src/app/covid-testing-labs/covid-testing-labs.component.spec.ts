import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CovidTestingLabsComponent } from './covid-testing-labs.component';

describe('CovidTestingLabsComponent', () => {
  let component: CovidTestingLabsComponent;
  let fixture: ComponentFixture<CovidTestingLabsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CovidTestingLabsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CovidTestingLabsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
