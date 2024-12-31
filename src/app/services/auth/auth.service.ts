import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = environment.apiUrl
  private tokenSubject = new BehaviorSubject<string | null>(null);

  constructor(private http: HttpClient) {}

  // Observable to track authentication token
  get token$() {
    return this.tokenSubject.asObservable();
  }

  register(data: { name: string; email: string; password: string }) {
    return this.http.post<{ token: string }>(`${this.apiUrl}/auth/register`, data).pipe(
      tap((response) => {
        this.setToken(response.token);
      })
    );
  }

  login(data: { name: string; password: string }) {
    return this.http.post<{ access_token: string }>(`${this.apiUrl}/auth/login`, data).pipe(
      tap((response) => {
        this.setToken(response.access_token);
      })
    );
  }
  
  private setToken(token: string) {
    localStorage.setItem('authToken', token);
    this.tokenSubject.next(token);
  }

  getToken(): string | null {
    return localStorage.getItem('authToken');
  }

  logout() {
    localStorage.removeItem('authToken');
    this.tokenSubject.next(null);
  }
}
