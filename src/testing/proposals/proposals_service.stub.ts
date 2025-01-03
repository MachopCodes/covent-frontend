import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Proposal, ProposalCreateRequest } from 'src/app/models/proposal.model';
import {
  MOCK_PROPOSAL_APPROVED,
  MOCK_PROPOSAL_PENDING,
  MOCK_PROPOSAL_REJECTED,
} from 'src/testing/proposals/proposals.mock';

@Injectable({
  providedIn: 'root',
})
export class ProposalServiceStub {
  constructor() {}

  // Get all proposals that I'm the event owner of or the sponsor owner of
  getProposals(): Observable<Proposal[]> {
    return of([
      MOCK_PROPOSAL_APPROVED,
      MOCK_PROPOSAL_PENDING,
      MOCK_PROPOSAL_REJECTED,
    ]);
  }

  // Get a specific proposal by ID
  getProposal(id: number): Observable<Proposal> {
    return of(MOCK_PROPOSAL_APPROVED);
  }

  // Create a new proposal
  createProposal(proposal: ProposalCreateRequest): Observable<Proposal> {
    return of(MOCK_PROPOSAL_APPROVED);
  }

  // Update an existing proposal
  updateProposal(
    id: number,
    proposal: Partial<Proposal>
  ): Observable<Proposal> {
    return of(MOCK_PROPOSAL_APPROVED);
  }

  // Delete a proposal by ID
  deleteProposal(id: number): Observable<void> {
    return of();
  }
}
