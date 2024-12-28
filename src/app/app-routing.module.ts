import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import {
  eventGetResolver,
  eventIndexResolver,
} from './resolvers/event.resolver';
import {
  sponsorGetResolver,
  sponsorIndexResolver,
} from './resolvers/sponsor.resolver';
import { proposalIndexResolver } from './resolvers/proposal.resolver';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./pages/home/home.module').then((m) => m.HomePageModule),
  },
  {
    path: 'sign-up',
    loadChildren: () =>
      import('./pages/sign-up/sign-up.module').then((m) => m.SignUpPageModule),
  },
  {
    path: 'sponsors',
    loadChildren: () =>
      import('./pages/sponsors/sponsors.module').then(
        (m) => m.SponsorsPageModule
      ),
    resolve: { sponsors: sponsorIndexResolver },
  },
  {
    path: 'sponsors/:id',
    loadChildren: () =>
      import('./pages/view-sponsor/view-sponsor.module').then(
        (m) => m.ViewSponsorPageModule
      ),
    resolve: { sponsor: sponsorGetResolver },
  },
  {
    path: 'events',
    loadChildren: () =>
      import('./pages/events/events.module').then((m) => m.EventsPageModule),
    resolve: { events: eventIndexResolver },
  },
  {
    path: 'events/:id',
    loadChildren: () =>
      import('./pages/view-event/view-event.module').then(
        (m) => m.ViewEventPageModule
      ),
    resolve: { event: eventGetResolver },
  },
  {
    path: 'proposals',
    loadChildren: () =>
      import('./pages/proposals/proposals.module').then(
        (m) => m.ProposalsPageModule
      ),
    resolve: { proposals: proposalIndexResolver },
  },
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
