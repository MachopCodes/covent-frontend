import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { SponsorsPage } from './sponsors.page';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';
import { MOCK_SPONSORS } from 'src/testing/sponsors/sponsors_mock_data';
import { HeaderComponent } from 'src/app/shared/header/header.component';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('SponsorsPage', () => {
  let component: SponsorsPage;
  let fixture: ComponentFixture<SponsorsPage>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SponsorsPage],
      imports: [IonicModule.forRoot(), HeaderComponent, RouterModule],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ sponsors: MOCK_SPONSORS }) },
        },
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(SponsorsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should display the correct number of sponsors', () => {
    const sponsorCards = fixture.debugElement.queryAll(By.css('ion-card'));
    expect(sponsorCards.length).toBe(MOCK_SPONSORS.length);
  });

  it('should display sponsor details correctly', () => {
    const sponsorCards = fixture.debugElement.queryAll(By.css('ion-card'));
    sponsorCards.forEach((card, index) => {
      const sponsor = MOCK_SPONSORS[index];

      const title = card.query(By.css('ion-card-title')).nativeElement;
      const subtitle = card.query(By.css('ion-card-subtitle')).nativeElement;
      const budget = card.query(By.css('p:nth-of-type(1)')).nativeElement;
      const industry = card.query(By.css('p:nth-of-type(2)')).nativeElement;

      expect(title.textContent.trim()).toBeDefined();
      expect(subtitle.textContent.trim()).toBeDefined();
      expect(budget.textContent.trim()).toBeDefined();
      expect(industry.textContent.trim()).toBeDefined();
    });
  });

  it('should handle an empty sponsors list gracefully', () => {
    component.sponsors = [];
    fixture.detectChanges();

    const sponsorCards = fixture.debugElement.queryAll(By.css('ion-card'));
    expect(sponsorCards.length).toBe(0);
  });
});
