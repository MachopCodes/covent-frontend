import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./pages/home/home.module').then((m) => m.HomePageModule),
  },
  {
    path: 'sponsors',
    loadChildren: () =>
      import('./pages/sponsors/sponsors.module').then(
        (m) => m.SponsorsPageModule
      ),
  },
  {
    path: 'sponsors/:id',
    loadChildren: () =>
      import('./pages/view-sponsor/view-sponsor.module').then(
        (m) => m.ViewSponsorPageModule
      ),
  },
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
