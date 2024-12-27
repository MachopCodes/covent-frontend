import { ResolveFn } from '@angular/router';
import { inject } from '@angular/core';
import { Sponsor } from '../models/sponsor.model';
import { SponsorService } from '../services/sponsors/sponsor.service';

export const sponsorIndexResolver: ResolveFn<Sponsor[]> = () => {
  return inject(SponsorService).index();
};

export const sponsorGetResolver: ResolveFn<Sponsor> = (route) => {
  const sponsorId = route.paramMap.get('id');
  if (!sponsorId) throw new Error('Spnosor ID is required');
  return inject(SponsorService).get(Number(sponsorId));
};
