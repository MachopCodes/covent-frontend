import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { of } from 'rxjs';
import { ProposalsPage } from './proposals.page';
import { By } from '@angular/platform-browser';
import { Proposal } from 'src/app/models/proposal.model';
import { HeaderComponent } from 'src/app/shared/header/header.component';

describe('ProposalsPage', () => {
  let component: ProposalsPage;
  let fixture: ComponentFixture<ProposalsPage>;

  const mockProposals: Proposal[] = [];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProposalsPage],
      imports: [IonicModule.forRoot(), HeaderComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ proposals: mockProposals }) },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ProposalsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should display the correct number of proposals', () => {
    const proposalItems = fixture.debugElement.queryAll(By.css('ion-item'));
    expect(proposalItems.length).toBe(mockProposals.length);
  });

  it('should display proposal details correctly', () => {
    const proposalItems = fixture.debugElement.queryAll(By.css('ion-item'));
    proposalItems.forEach((item, index) => {
      const label = item.query(By.css('ion-label')).nativeElement;
      expect(label.textContent.trim()).toBe(
        `${mockProposals[index].event_snapshot.name} x ${mockProposals[index].sponsor_snapshot.company_name}`
      );
    });
  });

  it('should display badges with the correct status and color', () => {
    const proposalItems = fixture.debugElement.queryAll(By.css('ion-item'));
    proposalItems.forEach((item, index) => {
      const badge = item.query(By.css('ion-badge')).nativeElement;
      expect(badge.textContent.trim()).toBe(mockProposals[index].status);

      const expectedColor =
        mockProposals[index].status === 'APPROVED'
          ? 'success'
          : mockProposals[index].status === 'PENDING'
          ? 'warning'
          : 'danger';
      expect(badge.getAttribute('color')).toBe(expectedColor);
    });
  });

  it('should handle an empty proposals list gracefully', () => {
    component.proposals = [];
    fixture.detectChanges();

    const proposalItems = fixture.debugElement.queryAll(By.css('ion-item'));
    expect(proposalItems.length).toBe(0);

    const emptyState = fixture.debugElement.query(By.css('h3'));
    expect(emptyState.nativeElement.textContent.trim()).toBe('My Proposals');
  });
});
