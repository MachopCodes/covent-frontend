import { Component } from '@angular/core';
import { IonicModule, ModalController } from '@ionic/angular';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login-modal',
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.scss'],
  imports: [FormsModule, ReactiveFormsModule, IonicModule, CommonModule],
})
export class LoginModalComponent {
  loginForm: FormGroup;

  constructor(
    private modalController: ModalController,
    private formBuilder: FormBuilder
  ) {
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  dismiss() {
    this.modalController.dismiss();
  }

  login() {
    if (this.loginForm.valid) {
      const { username, password } = this.loginForm.value;
      console.log('Logging in with:', { username, password });
      this.dismiss();
    } else {
      console.log('Form is invalid');
    }
  }
}
