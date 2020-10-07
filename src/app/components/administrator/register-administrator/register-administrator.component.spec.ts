import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterAdministratorComponent } from './register-administrator.component';

describe('RegisterAdministratorComponent', () => {
  let component: RegisterAdministratorComponent;
  let fixture: ComponentFixture<RegisterAdministratorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterAdministratorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterAdministratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
