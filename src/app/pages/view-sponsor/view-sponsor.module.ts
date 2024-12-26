import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewSponsorPageRoutingModule } from './view-sponsor-routing.module';

import { ViewSponsorPage } from './view-sponsor.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViewSponsorPageRoutingModule
  ],
  declarations: [ViewSponsorPage]
})
export class ViewSponsorPageModule {}
