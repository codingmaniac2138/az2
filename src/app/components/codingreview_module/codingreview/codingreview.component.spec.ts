import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CodingreviewComponent } from './codingreview.component';

describe('CodingreviewComponent', () => {
  let component: CodingreviewComponent;
  let fixture: ComponentFixture<CodingreviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CodingreviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CodingreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
