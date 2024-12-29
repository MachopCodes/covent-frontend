import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { ModalController, IonicModule } from '@ionic/angular';
import { of } from 'rxjs';
import { ViewEventPage } from './view-event.page';
import { EventService } from 'src/app/services/events/event.service';
import { EditEventModalComponent } from 'src/app/shared/edit-event-modal/edit-event-modal.component';
import { MOCK_EVENT } from 'src/testing/events/events_mock_data';
import { EventServiceStub } from 'src/testing/events/event_service_stub';
import { HeaderComponent } from 'src/app/shared/header/header.component';

describe('ViewEventPage', () => {
  let component: ViewEventPage;
  let fixture: ComponentFixture<ViewEventPage>;
  let mockModalController: jasmine.SpyObj<ModalController>;

  beforeEach(async () => {
    mockModalController = jasmine.createSpyObj('ModalController', ['create']);

    await TestBed.configureTestingModule({
      declarations: [ViewEventPage],
      imports: [IonicModule.forRoot(), HeaderComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ event: MOCK_EVENT }) },
        },
        { provide: ModalController, useValue: mockModalController },
        { provide: EventService, useClass: EventServiceStub },
      ],
    }).compileComponents();
  });
  beforeEach(() => {
    fixture = TestBed.createComponent(ViewEventPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should load event data from ActivatedRoute', () => {
    expect(component.event).toEqual(MOCK_EVENT);
  });

  it('should open the EditEventModalComponent with event data', async () => {
    const mockModal = jasmine.createSpyObj('HTMLIonModalElement', [
      'present',
      'onDidDismiss',
    ]);
    mockModal.onDidDismiss.and.returnValue(
      Promise.resolve({ data: { name: 'Updated Event' } })
    );
    mockModalController.create.and.returnValue(Promise.resolve(mockModal));

    await component.openEventModal(MOCK_EVENT);

    expect(mockModalController.create).toHaveBeenCalledWith({
      component: EditEventModalComponent,
      componentProps: { event: MOCK_EVENT },
    });
    expect(mockModal.present).toHaveBeenCalled();
  });

  //   it('should call EventService.edit when modal returns updated data', async () => {
  //     const mockModal = jasmine.createSpyObj('HTMLIonModalElement', [
  //       'present',
  //       'onDidDismiss',
  //     ]);
  //     mockModal.onDidDismiss.and.returnValue(
  //       Promise.resolve({ data: MOCK_EVENT })
  //     );
  //     mockModalController.create.and.returnValue(Promise.resolve(mockModal));

  //     await component.openEventModal(MOCK_EVENT);

  //     const service = fixture.debugElement.injector.get(EventService);
  //     const spy = spyOn(service, 'edit').and.callThrough();
  //     expect(component.event).toEqual(MOCK_EVENT);

  //     expect(spy).toHaveBeenCalled();
  //   });

  it('should handle modal dismissal without data', async () => {
    const mockModal = jasmine.createSpyObj('HTMLIonModalElement', [
      'present',
      'onDidDismiss',
    ]);
    mockModal.onDidDismiss.and.returnValue(Promise.resolve({ data: null }));
    mockModalController.create.and.returnValue(Promise.resolve(mockModal));

    await component.openEventModal(MOCK_EVENT);

    expect(component).toBeTruthy();
  });
});
