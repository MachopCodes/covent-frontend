import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, provideRouter, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { EventsPage } from './events.page';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';
import { MOCK_EVENT_DATA } from 'src/testing/events/events_mock_data';
import { HeaderComponent } from 'src/app/shared/header/header.component';

describe('EventsPage', () => {
  let component: EventsPage;
  let fixture: ComponentFixture<EventsPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EventsPage],
      imports: [IonicModule.forRoot(), HeaderComponent, RouterModule],
      providers: [
        provideRouter([]),
        {
          provide: ActivatedRoute,
          useValue: { data: of({ events: MOCK_EVENT_DATA }) },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(EventsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should load event data from ActivatedRoute', () => {
    expect(component.eventData).toEqual(MOCK_EVENT_DATA);
  });

  it('should render the correct number of event cards', () => {
    const eventCards = fixture.debugElement.queryAll(By.css('ion-card'));
    expect(eventCards.length).toBe(MOCK_EVENT_DATA.length);
  });
});
