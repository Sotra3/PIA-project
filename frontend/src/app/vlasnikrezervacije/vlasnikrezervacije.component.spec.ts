import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VlasnikrezervacijeComponent } from './vlasnikrezervacije.component';

describe('VlasnikrezervacijeComponent', () => {
  let component: VlasnikrezervacijeComponent;
  let fixture: ComponentFixture<VlasnikrezervacijeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VlasnikrezervacijeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VlasnikrezervacijeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
