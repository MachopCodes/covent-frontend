import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { User } from 'src/app/models/user.model';
import { LoginModalComponent } from 'src/app/shared/login-modal/login-modal.component';
import { ModalController } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = environment.apiUrl;
  private tokenSubject = new BehaviorSubject<string | null>(null);
  user = new Subject<number>();

  constructor(
    private http: HttpClient,
    private modalController: ModalController
  ) {
    this.tokenSubject.next(this.getToken());
  }

  // Observable to track authentication token
  get token$() {
    return this.tokenSubject.asObservable();
  }

  register(data: { name: string; email: string; password: string }) {
    return this.http
      .post<{ access_token: string; user: User }>(
        `${this.apiUrl}/auth/register`,
        data
      )
      .pipe(
        tap((response) => {
          this.setToken(response.access_token);
          this.setUser(response.user);
        })
      );
  }

  login(data: { name: string; password: string }) {
    return this.http
      .post<{ access_token: string; user: User }>(
        `${this.apiUrl}/auth/login`,
        data
      )
      .pipe(
        tap((response) => {
          this.setToken(response.access_token);
          this.setUser(response.user);
        })
      );
  }

  async openLoginModal() {
    console.log('create?');
    const modal = await this.modalController.create({
      component: LoginModalComponent,
      backdropDismiss: false, // Disable dismiss by clicking outside
    });
    return await modal.present();
  }

  private setToken(token: string) {
    localStorage.setItem('authToken', token);
    this.tokenSubject.next(token);
  }

  private setUser(user: User) {
    localStorage.setItem('user', user.id.toString());
    this.user.next(user.id);
  }

  getUser(): string | null {
    return localStorage.getItem('user');
  }

  getToken(): string | null {
    return localStorage.getItem('authToken');
  }

  logout() {
    localStorage.removeItem('authToken');
    this.tokenSubject.next(null);
  }
}
