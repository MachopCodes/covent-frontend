import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { LoginComponent } from '../login/login.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  imports: [IonicModule, CommonModule, LoginComponent, RouterModule],
})
export class HeaderComponent implements OnInit {
  @Input() back!: string;
  @Input() title!: string;
  constructor() {}

  ngOnInit() {}
}
