import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SponsorsPageRoutingModule } from './sponsors-routing.module';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { SponsorsPage } from './sponsors.page';
import { HeaderComponent } from '../../shared/header/header.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SponsorsPageRoutingModule,
    ScrollingModule,
    HeaderComponent,
  ],
  declarations: [SponsorsPage],
})
export class SponsorsPageModule {}
