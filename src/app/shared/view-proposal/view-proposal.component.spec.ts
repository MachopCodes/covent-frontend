import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ViewProposalComponent } from './view-proposal.component';
import { SponsorService } from 'src/app/services/sponsors/sponsor.service';
import { EventService } from 'src/app/services/events/event.service';
import { ProposalService } from 'src/app/services/proposals/proposal.service';
import { IonicModule } from '@ionic/angular';
import { of, throwError } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { SponsorServiceStub } from 'src/testing/sponsors/sponsors_service.stub';
import { ProposalServiceStub } from 'src/testing/proposals/proposals_service.stub';
import { EventServiceStub } from 'src/testing/events/event_service.stub';

xdescribe('ViewProposalComponent', () => {
  let component: ViewProposalComponent;
  let fixture: ComponentFixture<ViewProposalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IonicModule, ViewProposalComponent, FormsModule],
      providers: [
        { provide: SponsorService, useClass: SponsorServiceStub },
        { provide: EventService, useClass: EventServiceStub },
        { provide: ProposalService, useClass: ProposalServiceStub },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ViewProposalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  xdescribe('ngOnInit', () => {
    it('should fetch sponsor and event details on init', () => {
      const sponsorMock = { id: 1, name: 'Test Sponsor' } as any;
      const eventMock = { id: 2, name: 'Test Event' } as any;

      component.proposal = { sponsor_id: 1, event_id: 2 } as any;
      component.ngOnInit();

      expect(component.sponsor).toEqual(sponsorMock);
      expect(component.event).toEqual(eventMock);
    });

    it('should handle error when fetching sponsor or event fails', () => {
      const spnosorServiceMock =
        fixture.debugElement.injector.get(SponsorService);
      const eventServiceMock = fixture.debugElement.injector.get(EventService);
      spyOn(spnosorServiceMock, 'get').and.returnValue(
        throwError(() => new Error('Sponsor fetch error'))
      );
      spyOn(eventServiceMock, 'get').and.returnValue(of());
      throwError(() => new Error('Sponsor fetch error'));

      component.proposal = { sponsor_id: 1, event_id: 2 } as any;
      component.ngOnInit();
      expect(eventServiceMock.get).toHaveBeenCalledWith(2);
      expect(component.sponsor).toBeUndefined();
      expect(component.event).toBeNull();
    });
  });
});
