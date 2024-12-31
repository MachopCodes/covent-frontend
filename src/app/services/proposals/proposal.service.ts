import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Proposal, ProposalCreateRequest } from 'src/app/models/proposal.model';
import { environment } from 'src/environments/environment';
import {
  MOCK_PROPOSAL_APPROVED,
  MOCK_PROPOSAL_PENDING,
  MOCK_PROPOSAL_REJECTED,
} from 'src/testing/proposals/proposals_mock_data';

@Injectable({
  providedIn: 'root',
})
export class ProposalService {
  private apiUrl = `${environment.apiUrl}/proposals`; // Ensure your environment file has `apiUrl`

  constructor(private http: HttpClient) {}

  // Get all proposals that I'm the event owner of or the sponsor owner of
  getProposals(): Observable<Proposal[]> {
    return of([
      MOCK_PROPOSAL_APPROVED,
      MOCK_PROPOSAL_APPROVED,
      MOCK_PROPOSAL_PENDING,
      MOCK_PROPOSAL_REJECTED,
    ]);
    return this.http.get<Proposal[]>(this.apiUrl);
  }

  // Get a specific proposal by ID
  getProposal(id: number): Observable<Proposal> {
    return of(MOCK_PROPOSAL_APPROVED);
    return this.http.get<Proposal>(`${this.apiUrl}/${id}`);
  }

  // Create a new proposal
  createProposal(proposal: ProposalCreateRequest): Observable<Proposal> {
    return this.http.post<Proposal>(this.apiUrl, proposal);
  }

  // Update an existing proposal
  updateProposal(proposal: Partial<Proposal>): Observable<Proposal> {
    return this.http.put<Proposal>(`${this.apiUrl}/${proposal.id}`, proposal);
  }

  // Delete a proposal by ID
  deleteProposal(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
