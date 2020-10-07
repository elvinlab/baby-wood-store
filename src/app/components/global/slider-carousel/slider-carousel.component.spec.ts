import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SliderCarouselComponent } from './slider-carousel.component';

describe('SliderCarouselComponent', () => {
  let component: SliderCarouselComponent;
  let fixture: ComponentFixture<SliderCarouselComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SliderCarouselComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SliderCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
