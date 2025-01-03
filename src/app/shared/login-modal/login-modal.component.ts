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
import { Router, RouterModule } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { LoaderService } from 'src/app/services/loader/loader.service';
import { ErrorService } from 'src/app/services/error/error.service';

@Component({
  selector: 'app-login-modal',
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.scss'],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    CommonModule,
    RouterModule,
  ],
})
export class LoginModalComponent {
  loginForm: FormGroup;

  constructor(
    private modalController: ModalController,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private loaderService: LoaderService,
    private errorService: ErrorService,
    private router: Router
  ) {
    this.loginForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(1)]],
      password: ['', [Validators.required, Validators.minLength(3)]],
    });
  }

  dismiss() {
    this.modalController.dismiss();
  }

  login() {
    if (this.loginForm.valid) {
      this.loaderService.show()
      this.authService.login(this.loginForm.value).subscribe({
        next: (response) => console.log('response', response),
        error: (error) => this.errorService.handleError(error),
        complete: () => this.loaderService.hide()
      })
      this.dismiss()
    } else {
      console.log('Form is invalid');
    }
  }

  async closeModal() {
    await this.modalController.dismiss(); // Wait for the modal to dismiss
    this.router.navigate(['sign-up']); // Navigate after the modal is closed
  }
}
