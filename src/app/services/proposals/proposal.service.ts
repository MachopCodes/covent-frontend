import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Proposal } from 'src/app/models/proposal.model';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class ProposalService {
  private apiUrl = `${environment.apiUrl}/proposals`; // Ensure your environment file has `apiUrl`

  constructor(private http: HttpClient) {}

  // Get all proposals
  getProposals(): Observable<Proposal[]> {
    return this.http.get<Proposal[]>(this.apiUrl);
  }

  // Get a specific proposal by ID
  getProposal(id: number): Observable<Proposal> {
    return this.http.get<Proposal>(`${this.apiUrl}/${id}`);
  }

  // Create a new proposal
  createProposal(proposal: Proposal): Observable<Proposal> {
    return this.http.post<Proposal>(this.apiUrl, proposal);
  }

  // Update an existing proposal
  updateProposal(
    id: number,
    proposal: Partial<Proposal>
  ): Observable<Proposal> {
    return this.http.put<Proposal>(`${this.apiUrl}/${id}`, proposal);
  }

  // Delete a proposal by ID
  deleteProposal(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
