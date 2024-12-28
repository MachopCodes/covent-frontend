import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ViewSponsorPageRoutingModule } from './view-sponsor-routing.module';
import { ViewSponsorPage } from './view-sponsor.page';
import { HeaderComponent } from '../../shared/header/header.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViewSponsorPageRoutingModule,
    HeaderComponent,
  ],
  declarations: [ViewSponsorPage],
})
export class ViewSponsorPageModule {}
