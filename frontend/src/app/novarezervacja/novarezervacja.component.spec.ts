import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NovarezervacjaComponent } from './novarezervacja.component';

describe('NovarezervacjaComponent', () => {
  let component: NovarezervacjaComponent;
  let fixture: ComponentFixture<NovarezervacjaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NovarezervacjaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NovarezervacjaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
