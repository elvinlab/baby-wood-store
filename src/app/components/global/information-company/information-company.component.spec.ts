import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InformationCompanyComponent } from './information-company.component';

describe('InformationCompanyComponent', () => {
  let component: InformationCompanyComponent;
  let fixture: ComponentFixture<InformationCompanyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InformationCompanyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InformationCompanyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
