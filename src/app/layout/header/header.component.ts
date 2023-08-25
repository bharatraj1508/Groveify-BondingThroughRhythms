import { Component, OnInit } from '@angular/core';
import { TokenService } from 'src/app/services/token.service';
import { HostListener } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  token: string | null = null;
  isScrolled: boolean = false;

  constructor(private tokenService: TokenService) {}

  @HostListener('window:scroll', ['$event.target'])
  scroll(e: any) {
    let scroll = window.scrollY;
    if (scroll > 50) {
      this.isScrolled = true;
    } else if (scroll === 0) {
      this.isScrolled = false;
    }
  }

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
