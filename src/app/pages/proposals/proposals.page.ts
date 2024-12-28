import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Proposal } from 'src/app/models/proposal.model';

@Component({
  selector: 'app-proposals',
  templateUrl: './proposals.page.html',
  styleUrls: ['./proposals.page.scss'],
  standalone: false,
})
export class ProposalsPage implements OnInit {
  proposals!: Proposal[];
  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.data.subscribe((data) => (this.proposals = data['proposals']));
  }
}
