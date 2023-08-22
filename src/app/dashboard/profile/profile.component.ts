import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent {
  userProfile: any;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private tokenService: TokenService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      const acc = params['t'];
      const ref = params['r'];

      if (acc) {
        // Store the access token
        localStorage.setItem('access_token', acc);
        this.tokenService.setToken(acc); // Notify TokenService about the token
        console.log(acc);
      } else {
        console.log('Token object is null right now');
      }
    });
  }

  ngAfterViewInit(): void {
    this.userService.getUserProfile().subscribe({
      next: (response) => {
        this.userProfile = response;
      },
      error: (error) => {
        console.error(error);
      },
    });
  }
}
