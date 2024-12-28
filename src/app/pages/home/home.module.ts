import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { HomePageRoutingModule } from './home-routing.module';
import { HomePage } from './home.page';
import { LoginComponent } from '../../shared/login/login.component';
import { HeaderComponent } from '../../shared/header/header.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    LoginComponent,
    HeaderComponent,
  ],
  declarations: [HomePage],
})
export class HomePageModule {}
