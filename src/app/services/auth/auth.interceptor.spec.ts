import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import {
  HttpClient,
  provideHttpClient,
  withInterceptors,
} from '@angular/common/http';
import { authInterceptor } from './auth.interceptor';

describe('AuthInterceptor', () => {
  let httpMock: HttpTestingController;
  let http: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [provideHttpClient(withInterceptors([authInterceptor]))], // Provide the function-based interceptor
    });

    http = TestBed.inject(HttpClient);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  xit('should add an Authorization header if a token exists', () => {
    localStorage.setItem('authToken', 'test-token');

    http.get('/auth').subscribe();

    const req = httpMock.expectOne('/auth');
    expect(req.request.headers.get('Authorization')).toBe('Bearer auth-token');
  });

  xit('should not add an Authorization header if no token exists', () => {
    localStorage.removeItem('authToken');

    http.get('/auth').subscribe();

    const req = httpMock.expectOne('/auth');
    expect(req.request.headers.has('Authorization')).toBe(false);
  });
});
