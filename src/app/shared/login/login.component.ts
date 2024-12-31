import { Component, OnDestroy, OnInit } from '@angular/core';
import { IonicModule, ModalController } from '@ionic/angular';
import { LoginModalComponent } from '../login-modal/login-modal.component';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  imports: [IonicModule],
})
export class LoginComponent implements OnInit, OnDestroy {
  private sub = new Subscription();
  isLoggedIn = false;

  constructor(
    private modalController: ModalController,
    private authService: AuthService
  ) {}

  ngOnInit() {
    // Check if the user is logged in by checking the token
    this.sub.add(
      this.authService.token$.subscribe((token) => {
        this.isLoggedIn = !!token; // Set isLoggedIn to true if a token exists
      })
    );

    // Alternatively, directly check the token in localStorage during initialization
    const token = this.authService.getToken();
    this.isLoggedIn = !!token;
  }

  async openLoginModal() {
    if (!this.isLoggedIn) {
      const modal = await this.modalController.create({
        component: LoginModalComponent,
      });

      modal.onDidDismiss().then(() => {
        // After modal closes, check login status again
        const token = this.authService.getToken();
        this.isLoggedIn = !!token;
      });

      return await modal.present();
    }
  }

  logout() {
    // Call AuthService to log the user out
    this.authService.logout();
    this.isLoggedIn = false;
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
