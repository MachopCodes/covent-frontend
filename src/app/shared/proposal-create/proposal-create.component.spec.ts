import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { IonicModule, ModalController } from '@ionic/angular';
import { of, throwError } from 'rxjs';
import { CreateProposalDialogComponent } from './proposal-create.component';
import { ProposalService } from 'src/app/services/proposals/proposal.service';
import { EventService } from 'src/app/services/events/event.service';
import { ProposalServiceStub } from 'src/testing/proposals/proposals_service_stub';
import { EventServiceStub } from 'src/testing/events/event_service_stub';
import { MOCK_SPONSORS } from 'src/testing/sponsors/sponsors_mock_data';
import { MOCK_EVENT_DATA } from 'src/testing/events/events_mock_data';
import { By } from '@angular/platform-browser';
import { MOCK_PROPOSAL_APPROVED } from 'src/testing/proposals/proposals_mock_data';
import {
  HttpClientTestingModule,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';

describe('Create Proposal Component', () => {
  let component: CreateProposalDialogComponent;
  let fixture: ComponentFixture<CreateProposalDialogComponent>;
  let mockModalController: jasmine.SpyObj<ModalController>;

  beforeEach(async () => {
    mockModalController = jasmine.createSpyObj('ModalController', ['create']);
    await TestBed.configureTestingModule({
      imports: [
        CreateProposalDialogComponent,
        ReactiveFormsModule,
        FormsModule,
        IonicModule.forRoot(),
      ],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: ProposalService, useClass: ProposalServiceStub },
        { provide: EventService, useClass: EventServiceStub },
        { provide: ModalController, useValue: mockModalController },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CreateProposalDialogComponent);
    component = fixture.componentInstance;
    component.sponsor = MOCK_SPONSORS[0]; // Inject mock sponsor
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with default values', () => {
    expect(component.proposalForm).toBeDefined();
    expect(component.proposalForm.value).toEqual({
      event_id: '',
      notes: '',
      contactInfo: '',
    });
  });

  it('should fetch events on initialization', () => {
    expect(component.events).toEqual(MOCK_EVENT_DATA);
  });

  it('should display validation errors when form fields are invalid', () => {
    const form = component.proposalForm;

    form.get('event_id')?.markAsTouched();
    form.get('notes')?.markAsTouched();
    form.get('contactInfo')?.markAsTouched();
    fixture.detectChanges();

    const errorMessages = fixture.debugElement.queryAll(By.css('.error'));
    expect(errorMessages.length).toBe(3);
    expect(errorMessages[0].nativeElement.textContent).toContain(
      'Event name is required'
    );
    expect(errorMessages[1].nativeElement.textContent).toContain(
      'Notes are required'
    );
    expect(errorMessages[2].nativeElement.textContent).toContain(
      'Enter a valid email address'
    );
  });

  it('should submit a valid proposal and dismiss modal with response', () => {
    const formValues = {
      event_id: '1',
      notes: 'Important notes',
      contactInfo: 'email@example.com',
    };
    component.proposalForm.setValue(formValues);
    const proposalService = TestBed.inject(ProposalService);
    spyOn(proposalService, 'createProposal').and.returnValue(
      of(MOCK_PROPOSAL_APPROVED)
    );

    component.submitProposal();

    expect(proposalService.createProposal).toHaveBeenCalled();
  });

  it('should log an error if proposal submission fails', () => {
    spyOn(console, 'error');
    const formValues = {
      event_id: '1',
      notes: 'Important notes',
      contactInfo: 'email@example.com',
    };
    component.proposalForm.setValue(formValues);
    const proposalService = TestBed.inject(ProposalService);
    spyOn(proposalService, 'createProposal').and.returnValue(
      throwError(() => new Error('Error'))
    );

    component.submitProposal();

    expect(console.error).toHaveBeenCalledWith(
      'Error creating proposal:',
      jasmine.any(Error)
    );
  });
});
