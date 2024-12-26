import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewSponsorPage } from './view-sponsor.page';

const routes: Routes = [
  {
    path: '',
    component: ViewSponsorPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewSponsorPageRoutingModule {}
