import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, of, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { User } from 'src/app/models/user.model';
import { MOCK_USER } from './auth.mock';

@Injectable({
  providedIn: 'root',
})
export class AuthServiceStub {
  private tokenSubject = new BehaviorSubject<string | null>('123123123123');

  constructor(private http: HttpClient) {
    this.tokenSubject.next(this.getToken());
  }

  // Observable to track authentication token
  get token$() {
    return of('123243234234213');
  }

  register(data: { name: string; email: string; password: string }) {
    return of();
  }

  async openLoginModal() {}

  login(data: { name: string; password: string }) {
    return of();
  }

  getUser(): string | null {
    return 'MOCK_USER';
  }

  getToken(): string | null {
    return '1232133432423';
  }

  logout() {
    return;
  }
}
