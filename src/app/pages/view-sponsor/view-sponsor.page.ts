import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Sponsor } from 'src/app/models/sponsor.model';

@Component({
  selector: 'app-view-sponsor',
  templateUrl: './view-sponsor.page.html',
  styleUrls: ['./view-sponsor.page.scss'],
  standalone: false,
})
export class ViewSponsorPage implements OnInit {
  sponsor!: Sponsor;
  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.data.subscribe((data) => (this.sponsor = data['sponsor']));
  }
}
