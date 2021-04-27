import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailKelasComponent } from './detail-kelas.component';

describe('DetailKelasComponent', () => {
  let component: DetailKelasComponent;
  let fixture: ComponentFixture<DetailKelasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailKelasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailKelasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
