import { Component, OnInit } from '@angular/core';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  token: string | null = null;

  constructor(private tokenService: TokenService) {}

  ngOnInit(): void {
    this.tokenService.token$.subscribe((token) => {
      this.token = token;
    });
  }

  logout() {
    // Notify TokenService about token removal

    this.tokenService.setToken(null);
  }
}
