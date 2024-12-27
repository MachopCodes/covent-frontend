import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Sponsor } from 'src/app/models/sponsor.model';
import { environment } from 'src/environments/environment.prod'; // Update as needed

@Injectable({
  providedIn: 'root',
})
export class SponsorService {
  private apiUrl = environment.apiUrl; // Replace with your .env setup

  constructor(private http: HttpClient) {}

  // Get all sponsors
  index(): Observable<Sponsor[]> {
    return this.http.get<Sponsor[]>(`${this.apiUrl}/sponsors`);
  }

  // Get a specific sponsor by ID
  get(id: number): Observable<Sponsor> {
    return this.http.get<Sponsor>(`${this.apiUrl}/sponsors/${id}`);
  }

  // Create a new sponsor
  create(sponsor: Sponsor): Observable<Sponsor> {
    return this.http.post<Sponsor>(`${this.apiUrl}/sponsors`, sponsor);
  }

  // Edit an existing sponsor
  edit(id: number, sponsor: Partial<Sponsor>): Observable<Sponsor> {
    return this.http.put<Sponsor>(`${this.apiUrl}/sponsors/${id}`, sponsor);
  }

  // Delete a sponsor by ID
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/sponsors/${id}`);
  }
}