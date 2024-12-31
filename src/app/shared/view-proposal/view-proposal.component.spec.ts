import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ViewProposalComponent } from './view-proposal.component';
import { SponsorService } from 'src/app/services/sponsors/sponsor.service';
import { EventService } from 'src/app/services/events/event.service';
import { ProposalService } from 'src/app/services/proposals/proposal.service';
import { LoaderService } from 'src/app/services/loader/loader.service';
import { ErrorService } from 'src/app/services/error/error.service';
import { IonicModule, ModalController, AngularDelegate } from '@ionic/angular';
import { of, throwError } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

describe('ViewProposalComponent', () => {
  let component: ViewProposalComponent;
  let fixture: ComponentFixture<ViewProposalComponent>;

  // Mock Services
  let sponsorServiceMock: jasmine.SpyObj<SponsorService>;
  let eventServiceMock: jasmine.SpyObj<EventService>;
  let proposalServiceMock: jasmine.SpyObj<ProposalService>;
  let loaderServiceMock: jasmine.SpyObj<LoaderService>;
  let errorServiceMock: jasmine.SpyObj<ErrorService>;
  let modalControllerMock: jasmine.SpyObj<ModalController>;

  beforeEach(async () => {
    sponsorServiceMock = jasmine.createSpyObj('SponsorService', ['get']);
    eventServiceMock = jasmine.createSpyObj('EventService', ['get']);
    proposalServiceMock = jasmine.createSpyObj('ProposalService', [
      'updateProposal',
    ]);
    loaderServiceMock = jasmine.createSpyObj('LoaderService', ['show', 'hide']);
    errorServiceMock = jasmine.createSpyObj('ErrorService', ['handleError']);
    modalControllerMock = jasmine.createSpyObj('ModalController', ['dismiss']);

    await TestBed.configureTestingModule({
      imports: [IonicModule, ViewProposalComponent, CommonModule, FormsModule],
      providers: [
        { provide: SponsorService, useValue: sponsorServiceMock },
        { provide: EventService, useValue: eventServiceMock },
        { provide: ProposalService, useValue: proposalServiceMock },
        { provide: LoaderService, useValue: loaderServiceMock },
        { provide: ErrorService, useValue: errorServiceMock },
        { provide: ModalController, useValue: modalControllerMock },
        AngularDelegate, // Explicitly provide AngularDelegate
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ViewProposalComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('should fetch sponsor and event details on init', () => {
      const sponsorMock = { id: 1, name: 'Test Sponsor' } as any;
      const eventMock = { id: 2, name: 'Test Event' } as any;

      sponsorServiceMock.get.and.returnValue(of(sponsorMock));
      eventServiceMock.get.and.returnValue(of(eventMock));

      component.proposal = { sponsor_id: 1, event_id: 2 } as any;
      component.ngOnInit();

      expect(sponsorServiceMock.get).toHaveBeenCalledWith(1);
      expect(eventServiceMock.get).toHaveBeenCalledWith(2);
      expect(component.sponsor).toEqual(sponsorMock);
      expect(component.event).toEqual(eventMock);
    });

    it('should handle error when fetching sponsor or event fails', () => {
      sponsorServiceMock.get.and.returnValue(
        throwError(() => new Error('Sponsor fetch error'))
      );
      eventServiceMock.get.and.returnValue(of());

      component.proposal = { sponsor_id: 1, event_id: 2 } as any;
      component.ngOnInit();

      expect(sponsorServiceMock.get).toHaveBeenCalledWith(1);
      expect(eventServiceMock.get).toHaveBeenCalledWith(2);
      expect(component.sponsor).toBeUndefined();
      expect(component.event).toBeNull();
    });
  });

  describe('saveStatus', () => {
    it('should update proposal and hide loader on success', () => {
      const updatedProposal = { id: 1, status: 'APPROVED' } as any;

      proposalServiceMock.updateProposal.and.returnValue(of(updatedProposal));
      component.proposal = { id: 1, status: 'PENDING' } as any;

      component.saveStatus();

      expect(loaderServiceMock.show).toHaveBeenCalled();
      expect(proposalServiceMock.updateProposal).toHaveBeenCalledWith(
        component.proposal
      );
      expect(component.proposal).toEqual(updatedProposal);
      expect(loaderServiceMock.hide).toHaveBeenCalled();
    });

    it('should handle error and hide loader on failure', () => {
      const error = new Error('Update failed');

      proposalServiceMock.updateProposal.and.returnValue(
        throwError(() => error)
      );
      component.proposal = { id: 1, status: 'PENDING' } as any;

      component.saveStatus();

      expect(loaderServiceMock.show).toHaveBeenCalled();
      expect(proposalServiceMock.updateProposal).toHaveBeenCalledWith(
        component.proposal
      );
      expect(errorServiceMock.handleError).toHaveBeenCalledWith(error);
      expect(loaderServiceMock.hide).toHaveBeenCalled();
    });
  });

  describe('dismiss', () => {
    it('should dismiss the modal', () => {
      component.dismiss();

      expect(modalControllerMock.dismiss).toHaveBeenCalled();
    });
  });
});
