import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProposalsPageRoutingModule } from './proposals-routing.module';

import { ProposalsPage } from './proposals.page';
import { HeaderComponent } from '../../shared/header/header.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProposalsPageRoutingModule,
    HeaderComponent,
  ],
  declarations: [ProposalsPage],
})
export class ProposalsPageModule {}
