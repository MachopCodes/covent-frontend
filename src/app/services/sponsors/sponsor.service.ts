import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Sponsor } from 'src/app/models/sponsor.model';
import { environment } from 'src/environments/environment';
import { MOCK_SPONSORS } from 'src/testing/sponsors/sponsors.mock';

@Injectable({
  providedIn: 'root',
})
export class SponsorService {
  private apiUrl = `${environment.apiUrl}/sponsors/`;

  constructor(private http: HttpClient) {}

  // Get all sponsors
  index(): Observable<Sponsor[]> {
    return this.http.get<Sponsor[]>(`${this.apiUrl}`);
  }

  // Get a specific sponsor by ID
  get(id: number): Observable<Sponsor> {
    return this.http.get<Sponsor>(`${this.apiUrl}${id}`);
  }

  // Create a new sponsor
  create(sponsor: Sponsor): Observable<Sponsor> {
    return this.http.post<Sponsor>(`${this.apiUrl}`, sponsor);
  }

  // Edit an existing sponsor
  edit(id: number, sponsor: Partial<Sponsor>): Observable<Sponsor> {
    return this.http.put<Sponsor>(`${this.apiUrl}${id}`, sponsor);
  }

  // Delete a sponsor by ID
  delete(id: number): Observable<Sponsor> {
    return this.http.delete<Sponsor>(`${this.apiUrl}${id}`);
  }
}
