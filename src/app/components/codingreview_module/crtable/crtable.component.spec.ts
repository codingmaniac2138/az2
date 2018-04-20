import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrtableComponent } from './crtable.component';

describe('CrtableComponent', () => {
  let component: CrtableComponent;
  let fixture: ComponentFixture<CrtableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrtableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrtableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
