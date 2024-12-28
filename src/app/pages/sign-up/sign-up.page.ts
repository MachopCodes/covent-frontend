import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss'],
  standalone: false,
})
export class SignUpPage {
  signUpForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.signUpForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit() {
    if (this.signUpForm.valid) {
      const { name, email, password } = this.signUpForm.value;
      console.log('Sign-Up Data:', { name, email, password });

      // Here, you would typically send this data to your backend
    } else {
      console.log('Form is invalid');
    }
  }
}
