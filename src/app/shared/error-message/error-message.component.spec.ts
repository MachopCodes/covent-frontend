import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ErrorMessageComponent } from './error-message.component';
import { ErrorService } from 'src/app/services/error/error.service';
import { IonicModule } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';

describe('ErrorMessageComponent', () => {
  let component: ErrorMessageComponent;
  let fixture: ComponentFixture<ErrorMessageComponent>;
  let errorService: ErrorService;

  // Mock ErrorService
  const errorSubject = new BehaviorSubject<string | null>(null);
  const mockErrorService = {
    error$: errorSubject.asObservable(),
    clearError: jasmine.createSpy('clearError'),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IonicModule, ErrorMessageComponent],
      providers: [{ provide: ErrorService, useValue: mockErrorService }],
    }).compileComponents();

    fixture = TestBed.createComponent(ErrorMessageComponent);
    component = fixture.componentInstance;
    errorService = TestBed.inject(ErrorService);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show toast when an error message is emitted', () => {
    const errorMessage = 'Test error message';
    errorSubject.next(errorMessage); // Emit error message

    fixture.detectChanges(); // Trigger change detection

    expect(component.isToastOpen).toBeTrue();
    expect(component.message).toBe(errorMessage);
  });

  it('should close toast and clear error on dismiss', () => {
    component.setOpen(false); // Simulate toast dismiss

    expect(component.isToastOpen).toBeFalse();
    expect(mockErrorService.clearError).toHaveBeenCalled();
  });
});
