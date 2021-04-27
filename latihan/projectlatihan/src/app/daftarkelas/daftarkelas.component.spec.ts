import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DaftarkelasComponent } from './daftarkelas.component';

describe('DaftarkelasComponent', () => {
  let component: DaftarkelasComponent;
  let fixture: ComponentFixture<DaftarkelasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DaftarkelasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DaftarkelasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
