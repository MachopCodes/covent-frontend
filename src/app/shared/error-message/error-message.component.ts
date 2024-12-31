import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { ErrorService } from 'src/app/services/error/error.service';

@Component({
  selector: 'app-error-message',
  templateUrl: './error-message.component.html',
  styleUrls: ['./error-message.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule],
})
export class ErrorMessageComponent implements OnInit {
  isToastOpen = false;
  message = '';

  constructor(private errorService: ErrorService) {}

  ngOnInit(): void {
    this.errorService.error$.subscribe((errorMessage) => {
      if (errorMessage) {
        this.message = errorMessage;
        this.isToastOpen = true;
      }
    });
  }

  setOpen(isOpen: boolean): void {
    this.isToastOpen = isOpen;
    if (!isOpen) {
      this.errorService.clearError();
    }
  }
}
