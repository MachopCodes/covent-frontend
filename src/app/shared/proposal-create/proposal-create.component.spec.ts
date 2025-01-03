import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { IonicModule, ModalController } from '@ionic/angular';
import { of, throwError } from 'rxjs';
import { CreateProposalDialogComponent } from './proposal-create.component';
import { ProposalService } from 'src/app/services/proposals/proposal.service';
import { EventService } from 'src/app/services/events/event.service';
import { ProposalServiceStub } from 'src/testing/proposals/proposals_service.stub';
import { MOCK_SPONSORS } from 'src/testing/sponsors/sponsors.mock';
import { MOCK_EVENT, MOCK_EVENT_DATA } from 'src/testing/events/events.mock';
import { By } from '@angular/platform-browser';
import { MOCK_PROPOSAL_APPROVED } from 'src/testing/proposals/proposals.mock';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { EventServiceStub } from 'src/testing/events/event_service.stub';

xdescribe('Create Proposal Component', () => {
  let component: CreateProposalDialogComponent;
  let fixture: ComponentFixture<CreateProposalDialogComponent>;

  beforeEach(async () => {
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
  });

  it('should fetch events on initialization', () => {
    expect(component.events).toEqual(MOCK_EVENT_DATA);
  });

  it('should display validation errors when form fields are invalid', () => {
    const form = component.proposalForm;

    form.get('event')?.markAsTouched();
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
  });

  it('should submit a valid proposal and dismiss modal with response', () => {
    const formValues = {
      event: MOCK_EVENT,
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
      event: MOCK_EVENT,
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
