import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditvikendicaComponent } from './editvikendica.component';

describe('EditvikendicaComponent', () => {
  let component: EditvikendicaComponent;
  let fixture: ComponentFixture<EditvikendicaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditvikendicaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditvikendicaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
