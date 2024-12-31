import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { LoaderService } from '../loader/loader.service';

@Injectable({
  providedIn: 'root',
})
export class ErrorService {
  private errorSubject = new BehaviorSubject<string | null>(null);
  constructor(private loaderService: LoaderService) {}
  error$ = this.errorSubject.asObservable();

  handleError(error: Error): void {
    console.error('Error:', error); // Log the error (optional)
    this.errorSubject.next(error.message); // Emit the error message
    this.loaderService.hide(); // Hide the loader
  }

  clearError(): void {
    this.errorSubject.next(null); // Clear the error
  }
}
