import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { By } from '@angular/platform-browser';
import { SignUpPage } from './sign-up.page';

describe('SignUpPage', () => {
  let component: SignUpPage;
  let fixture: ComponentFixture<SignUpPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SignUpPage],
      imports: [ReactiveFormsModule, IonicModule.forRoot()],
    }).compileComponents();

    fixture = TestBed.createComponent(SignUpPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with empty values', () => {
    const form = component.signUpForm;
    expect(form.value).toEqual({
      name: '',
      email: '',
      password: '',
    });
  });

  it('should make the form invalid when empty', () => {
    expect(component.signUpForm.valid).toBeFalse();
  });

  it('should validate name field correctly', () => {
    const nameControl = component.signUpForm.get('name');
    nameControl?.setValue('');
    expect(nameControl?.hasError('required')).toBeTrue();

    nameControl?.setValue('ab');
    expect(nameControl?.hasError('minlength')).toBeTrue();

    nameControl?.setValue('John');
    expect(nameControl?.valid).toBeTrue();
  });

  it('should validate email field correctly', () => {
    const emailControl = component.signUpForm.get('email');
    emailControl?.setValue('');
    expect(emailControl?.hasError('required')).toBeTrue();

    emailControl?.setValue('invalid-email');
    expect(emailControl?.hasError('email')).toBeTrue();

    emailControl?.setValue('test@example.com');
    expect(emailControl?.valid).toBeTrue();
  });

  it('should validate password field correctly', () => {
    const passwordControl = component.signUpForm.get('password');
    passwordControl?.setValue('');
    expect(passwordControl?.hasError('required')).toBeTrue();

    passwordControl?.setValue('12345');
    expect(passwordControl?.hasError('minlength')).toBeTrue();

    passwordControl?.setValue('123456');
    expect(passwordControl?.valid).toBeTrue();
  });

  it('should disable the submit button if the form is invalid', () => {
    const submitButton = fixture.debugElement.query(
      By.css('ion-button[type="submit"]')
    );
    expect(submitButton.nativeElement.disabled).toBeTrue();

    component.signUpForm.setValue({
      name: 'John',
      email: 'test@example.com',
      password: '123456',
    });
    fixture.detectChanges();
    expect(submitButton.nativeElement.disabled).toBeFalse();
  });

  it('should log form data on valid submission', () => {
    spyOn(console, 'log');
    component.signUpForm.setValue({
      name: 'John',
      email: 'test@example.com',
      password: '123456',
    });
    component.onSubmit();

    expect(console.log).toHaveBeenCalledWith('Sign-Up Data:', {
      name: 'John',
      email: 'test@example.com',
      password: '123456',
    });
  });

  it('should log an error message on invalid submission', () => {
    spyOn(console, 'log');
    component.signUpForm.setValue({
      name: '',
      email: '',
      password: '',
    });
    component.onSubmit();

    expect(console.log).toHaveBeenCalledWith('Form is invalid');
  });
});
