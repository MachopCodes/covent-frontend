import { TestBed } from '@angular/core/testing';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { SponsorService } from './sponsor.service';
import { Sponsor } from 'src/app/models/sponsor.model';
import { MOCK_SPONSORS } from 'src/testing/sponsors/sponsors.mock';
import { provideHttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

describe('SponsorService', () => {
  let service: SponsorService;
  let httpMock: HttpTestingController;
  const apiUrl = `${environment.apiUrl}/sponsors/`;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        SponsorService,
        { provide: 'apiUrl', useValue: apiUrl }, // Mock API URL
      ],
    });

    service = TestBed.inject(SponsorService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // Verify no outstanding HTTP requests
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  xit('should fetch all sponsors (index)', () => {
    service.index().subscribe((sponsors) => {
      expect(sponsors).toBeDefined();
    });

    const req = httpMock.expectOne(`${apiUrl}`);
    expect(req.request.method).toBe('GET');
    req.flush(MOCK_SPONSORS);
  });

  xit('should fetch a specific sponsor by ID (get)', () => {
    const mockSponsor = MOCK_SPONSORS[0];

    service.get(mockSponsor.id).subscribe((sponsor) => {
      expect(sponsor).toBeDefined();
    });

    const req = httpMock.expectOne(`${apiUrl}/${mockSponsor.id}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockSponsor); // Respond with mock data
  });

  it('should create a new sponsor (create)', () => {
    const newSponsor: Sponsor = {
      id: 3,
      name: 'Alice Johnson',
      job_title: 'Sales Executive',
      company_name: 'Retail Co',
      budget: 20000,
      industry: 'Retail',
      topics: ['E-commerce', 'Supply Chain'],
      event_attendee_personas: ['Retailers', 'Suppliers'],
      key_objectives_for_event_sponsorship: ['Sales', 'Partnerships'],
    };

    service.create(newSponsor).subscribe((sponsor) => {
      expect(sponsor).toEqual(newSponsor);
    });

    const req = httpMock.expectOne(`${apiUrl}`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(newSponsor);
    req.flush(newSponsor); // Respond with mock data
  });

  it('should edit an existing sponsor (edit)', () => {
    const updatedSponsor: Partial<Sponsor> = {
      budget: 60000,
    };

    service.edit(1, updatedSponsor).subscribe((sponsor) => {
      expect(sponsor.budget).toBeDefined();
    });

    const req = httpMock.expectOne(`${apiUrl}1`);
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual(updatedSponsor);
    req.flush({ ...MOCK_SPONSORS[0], ...updatedSponsor }); // Respond with updated mock data
  });

  it('should delete a sponsor by ID (delete)', () => {
    const sponsorId = 1;

    service.delete(sponsorId).subscribe((response) => {
      expect(response).toBeDefined(); // Delete request returns void
    });

    const req = httpMock.expectOne(`${apiUrl}${sponsorId}`);
    expect(req.request.method).toBe('DELETE');
    req.flush(MOCK_SPONSORS[0]); // Respond with no content
  });
});
