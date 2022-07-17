import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductitemdetailsComponent } from './productitemdetails.component';

describe('ProductitemdetailsComponent', () => {
  let component: ProductitemdetailsComponent;
  let fixture: ComponentFixture<ProductitemdetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductitemdetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductitemdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
