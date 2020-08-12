import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserBookShelfComponent } from './user-book-shelf.component';

describe('UserBookShelfComponent', () => {
  let component: UserBookShelfComponent;
  let fixture: ComponentFixture<UserBookShelfComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserBookShelfComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserBookShelfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
