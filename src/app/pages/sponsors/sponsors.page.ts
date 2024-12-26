import { Component, OnInit } from '@angular/core';
import { Sponsor } from 'src/interfaces/sponsor';
import { MOCK_SPONSORS } from 'src/testing/sponsors_mock_data';

@Component({
  selector: 'app-sponsors',
  templateUrl: './sponsors.page.html',
  styleUrls: ['./sponsors.page.scss'],
  standalone: false,
})
export class SponsorsPage implements OnInit {
  sponsors: Sponsor[] = MOCK_SPONSORS;
  constructor() {}

  ngOnInit() {}
}
