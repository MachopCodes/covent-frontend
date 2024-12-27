import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { SponsorService } from './sponsor.service';
import { Sponsor } from 'src/app/models/sponsor.model';

describe('SponsorService', () => {
  let service: SponsorService;
  let httpMock: HttpTestingController;

  const mockApiUrl = 'https://api.example.com'; // Replace with your actual mock API URL
  const mockSponsors: Sponsor[] = [
    {
      id: 1,
      name: 'John Doe',
      job_title: 'Marketing Manager',
      company_name: 'Tech Corp',
      budget: 50000,
      industry: 'Technology',
      topics: ['AI', 'Cloud'],
      event_attendee_personas: ['CTOs', 'Developers'],
      key_objectives_for_event_sponsorship: [
        'Brand awareness',
        'Lead generation',
      ],
    },
    {
      id: 2,
      name: 'Jane Smith',
      job_title: 'Business Development Manager',
      company_name: 'Startup Inc',
      budget: 30000,
      industry: 'Finance',
      topics: ['FinTech', 'Blockchain'],
      event_attendee_personas: ['Investors', 'Entrepreneurs'],
      key_objectives_for_event_sponsorship: ['Networking', 'Product demo'],
    },
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        SponsorService,
        { provide: 'apiUrl', useValue: mockApiUrl }, // Mock API URL
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

  it('should fetch all sponsors (index)', () => {
    service.index().subscribe((sponsors) => {
      expect(sponsors).toEqual(mockSponsors);
    });

    const req = httpMock.expectOne(`${mockApiUrl}/sponsors`);
    expect(req.request.method).toBe('GET');
    req.flush(mockSponsors); // Respond with mock data
  });

  it('should fetch a specific sponsor by ID (get)', () => {
    const mockSponsor = mockSponsors[0];

    service.get(mockSponsor.id).subscribe((sponsor) => {
      expect(sponsor).toEqual(mockSponsor);
    });

    const req = httpMock.expectOne(`${mockApiUrl}/sponsors/${mockSponsor.id}`);
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

    const req = httpMock.expectOne(`${mockApiUrl}/sponsors`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(newSponsor);
    req.flush(newSponsor); // Respond with mock data
  });

  it('should edit an existing sponsor (edit)', () => {
    const updatedSponsor: Partial<Sponsor> = {
      budget: 60000,
    };

    service.edit(1, updatedSponsor).subscribe((sponsor) => {
      expect(sponsor.budget).toEqual(updatedSponsor.budget!);
    });

    const req = httpMock.expectOne(`${mockApiUrl}/sponsors/1`);
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual(updatedSponsor);
    req.flush({ ...mockSponsors[0], ...updatedSponsor }); // Respond with updated mock data
  });

  it('should delete a sponsor by ID (delete)', () => {
    const sponsorId = 1;

    service.delete(sponsorId).subscribe((response) => {
      expect(response).toBeUndefined(); // Delete request returns void
    });

    const req = httpMock.expectOne(`${mockApiUrl}/sponsors/${sponsorId}`);
    expect(req.request.method).toBe('DELETE');
    req.flush(null); // Respond with no content
  });
});
