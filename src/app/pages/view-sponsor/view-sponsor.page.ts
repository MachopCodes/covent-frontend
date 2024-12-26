import { Component, OnInit } from '@angular/core';
import { MOCK_SPONSORS } from 'src/testing/sponsors_mock_data';

@Component({
  selector: 'app-view-sponsor',
  templateUrl: './view-sponsor.page.html',
  styleUrls: ['./view-sponsor.page.scss'],
  standalone: false,
})
export class ViewSponsorPage implements OnInit {
  sponsor = MOCK_SPONSORS[0];
  constructor() {}

  ngOnInit() {}
}
