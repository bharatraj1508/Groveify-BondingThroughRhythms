import { Component, OnInit } from '@angular/core';
import { TokenService } from './services/token.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'Groveify-BondingThroughRhythms';
  token: string | null = null;

  ngOnInit(): void {
    this.token = localStorage.getItem('access_token');
  }
}
