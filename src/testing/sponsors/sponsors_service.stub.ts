import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Sponsor } from 'src/app/models/sponsor.model';
import { MOCK_SPONSORS } from 'src/testing/sponsors/sponsors.mock';

@Injectable({
  providedIn: 'root',
})
export class SponsorServiceStub {
  constructor() {}

  // Get all sponsors
  index(): Observable<Sponsor[]> {
    return of(MOCK_SPONSORS);
  }

  // Get a specific sponsor by ID
  get(id: number): Observable<Sponsor> {
    return of(MOCK_SPONSORS[0]);
  }

  // Create a new sponsor
  create(sponsor: Sponsor): Observable<Sponsor> {
    return of(MOCK_SPONSORS[0]);
  }

  // Edit an existing sponsor
  edit(id: number, sponsor: Partial<Sponsor>): Observable<Sponsor> {
    return of(MOCK_SPONSORS[0]);
  }

  // Delete a sponsor by ID
  delete(id: number): Observable<void> {
    return of();
  }
}
