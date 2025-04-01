import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopNavSearchComponent } from './top-nav-search.component';

describe('TopNavSearchComponent', () => {
  let component: TopNavSearchComponent;
  let fixture: ComponentFixture<TopNavSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TopNavSearchComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TopNavSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
