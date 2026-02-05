import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VlasnikvikendiceComponent } from './vlasnikvikendice.component';

describe('VlasnikvikendiceComponent', () => {
  let component: VlasnikvikendiceComponent;
  let fixture: ComponentFixture<VlasnikvikendiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VlasnikvikendiceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VlasnikvikendiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
