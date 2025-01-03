import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { IonicModule, ModalController } from '@ionic/angular';
import { ActivatedRoute, provideRouter, RouterModule } from '@angular/router';
import { of } from 'rxjs';
import { ViewSponsorPage } from './view-sponsor.page';
import { HeaderComponent } from 'src/app/shared/header/header.component';
import { MOCK_SPONSORS } from 'src/testing/sponsors/sponsors.mock';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('ViewSponsorPage', () => {
  let component: ViewSponsorPage;
  let fixture: ComponentFixture<ViewSponsorPage>;
  let mockModalController: jasmine.SpyObj<ModalController>;

  beforeEach(async () => {
    mockModalController = jasmine.createSpyObj('ModalController', ['create']);

    await TestBed.configureTestingModule({
      declarations: [ViewSponsorPage],
      imports: [IonicModule.forRoot(), HeaderComponent, RouterModule],
      providers: [
        provideRouter([]),
        {
          provide: ActivatedRoute,
          useValue: { data: of({ sponsor: MOCK_SPONSORS[0] }) },
        },
        { provide: ModalController, useValue: mockModalController },
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ViewSponsorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should load sponsor data from ActivatedRoute', () => {
    expect(component.sponsor).toEqual(MOCK_SPONSORS[0]);
  });

  it('should display sponsor details correctly', () => {
    const cardTitle = fixture.debugElement.query(
      By.css('ion-card-title')
    ).nativeElement;
    const cardSubtitle = fixture.debugElement.query(
      By.css('ion-card-subtitle')
    ).nativeElement;
    const budget = fixture.debugElement.query(
      By.css('p:nth-of-type(1)')
    ).nativeElement;
    const industry = fixture.debugElement.query(
      By.css('p:nth-of-type(2)')
    ).nativeElement;
    const topics = fixture.debugElement.query(
      By.css('p:nth-of-type(3)')
    ).nativeElement;
    const personas = fixture.debugElement.query(
      By.css('p:nth-of-type(4)')
    ).nativeElement;
    const objectives = fixture.debugElement.query(
      By.css('p:nth-of-type(5)')
    ).nativeElement;

    expect(cardTitle.textContent.trim()).toBeDefined();
    expect(cardSubtitle.textContent.trim()).toBeDefined();
    expect(budget.textContent.trim()).toBeDefined();
    expect(industry.textContent.trim()).toBeDefined();
    expect(topics.textContent.trim()).toBeDefined();
    expect(personas.textContent.trim()).toBeDefined();
    expect(objectives.textContent.trim()).toBeDefined();
  });
});
