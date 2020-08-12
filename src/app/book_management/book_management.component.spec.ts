import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookManagementComponent } from './book_management.component';

describe('BookManagementComponent', () => {
  let component: BookManagementComponent;
  let fixture: ComponentFixture<BookManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
