import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss'],
  imports: [IonicModule, CommonModule],
})
export class LoaderComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
