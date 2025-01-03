import { TestBed } from '@angular/core/testing';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { ProposalService } from './proposal.service';
import { Proposal } from 'src/app/models/proposal.model';
import { environment } from 'src/environments/environment.prod';
import {
  MOCK_PROPOSAL_APPROVED,
  MOCK_PROPOSAL_CREATE_REQUEST,
  MOCK_PROPOSAL_PENDING,
  MOCK_PROPOSAL_REJECTED,
} from 'src/testing/proposals/proposals.mock';
import { provideHttpClient } from '@angular/common/http';

describe('ProposalService', () => {
  let service: ProposalService;
  let httpMock: HttpTestingController;
  const apiUrl = `${environment.apiUrl}/proposals`;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClientTesting(), provideHttpClient()],
    });

    service = TestBed.inject(ProposalService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('#getProposals', () => {
    xit('should return mock proposals', () => {
      service.getProposals().subscribe((proposals) => {
        expect(proposals).toEqual([
          MOCK_PROPOSAL_APPROVED,
          MOCK_PROPOSAL_PENDING,
          MOCK_PROPOSAL_REJECTED,
        ]);
      });
    });

    xit('should make a GET request when using the API', () => {
      service.getProposals().subscribe((proposals) => {
        expect(proposals).toBeDefined();
      });

      //   const req = httpMock.expectOne(apiUrl);
      //   expect(req.request.method).toBe('GET');
      //   req.flush([
      //     MOCK_PROPOSAL_APPROVED,
      //     MOCK_PROPOSAL_PENDING,
      //     MOCK_PROPOSAL_REJECTED,
      //   ]);
    });
  });

  describe('#getProposal', () => {
    xit('should fetch a single proposal by ID', () => {
      const mockProposal = MOCK_PROPOSAL_APPROVED;

      service.getProposal(1).subscribe((proposal) => {
        expect(proposal).toEqual(mockProposal);
      });

      //   const req = httpMock.expectOne(`${apiUrl}/1`);
      //   expect(req.request.method).toBe('GET');
      //   req.flush(mockProposal);
    });
  });

  describe('#createProposal', () => {
    xit('should create a new proposal', () => {
      const createdProposal: Proposal = {
        ...MOCK_PROPOSAL_CREATE_REQUEST,
        id: 3,
      };

      service
        .createProposal(MOCK_PROPOSAL_CREATE_REQUEST)
        .subscribe((proposal) => {
          expect(proposal).toEqual(createdProposal);
        });

      const req = httpMock.expectOne(apiUrl);
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual(MOCK_PROPOSAL_CREATE_REQUEST);
      req.flush(createdProposal);
    });
  });

  describe('#updateProposal', () => {
    xit('should update an existing proposal', () => {
      service.updateProposal(MOCK_PROPOSAL_PENDING).subscribe((proposal) => {
        expect(proposal).toBeDefined();
      });

      const req = httpMock.expectOne(`${apiUrl}/1`);
      expect(req.request.method).toBe('PUT');
      expect(req.request.body).toBeDefined();
      req.flush(MOCK_PROPOSAL_PENDING);
    });
  });

  describe('#deleteProposal', () => {
    xit('should delete a proposal by ID', () => {
      service.deleteProposal(1).subscribe((response) => {
        expect(response).toBeNull();
      });

      const req = httpMock.expectOne(`${apiUrl}/1`);
      expect(req.request.method).toBe('DELETE');
      req.flush(null);
    });
  });
});
