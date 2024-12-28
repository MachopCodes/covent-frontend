import { ResolveFn } from '@angular/router';
import { inject } from '@angular/core';
import { Proposal } from '../models/proposal.model';
import { ProposalService } from '../services/proposals/proposal.service';

export const proposalIndexResolver: ResolveFn<Proposal[]> = () => {
  return inject(ProposalService).getProposals();
};

export const proposalGetResolver: ResolveFn<Proposal> = (route) => {
  const eventId = route.paramMap.get('id');
  if (!eventId) throw new Error('Event ID is required');
  return inject(ProposalService).getProposal(Number(eventId));
};
