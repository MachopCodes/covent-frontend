import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ViewSponsorPage } from './view-sponsor.page';

describe('ViewSponsorPage', () => {
  let component: ViewSponsorPage;
  let fixture: ComponentFixture<ViewSponsorPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewSponsorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
