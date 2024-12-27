import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Sponsor } from 'src/app/models/sponsor.model';

@Component({
  selector: 'app-sponsors',
  templateUrl: './sponsors.page.html',
  styleUrls: ['./sponsors.page.scss'],
  standalone: false,
})
export class SponsorsPage implements OnInit {
  sponsors!: Sponsor[];
  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.data.subscribe((data) => (this.sponsors = data['sponsors']));
  }
}
