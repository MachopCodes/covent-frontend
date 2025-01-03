import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ViewEventPageRoutingModule } from './view-event-routing.module';
import { ViewEventPage } from './view-event.page';
import { HeaderComponent } from '../../shared/header/header.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViewEventPageRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HeaderComponent,
  ],
  declarations: [ViewEventPage],
})
export class ViewEventPageModule {}
