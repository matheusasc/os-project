import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OsDetailComponent } from './os-detail.component';

describe('OsDetailComponent', () => {
  let component: OsDetailComponent;
  let fixture: ComponentFixture<OsDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OsDetailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OsDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
