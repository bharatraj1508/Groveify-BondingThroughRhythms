import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { TokenService } from 'src/app/services/token.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent {
  userProfile: any;
  refresh_token: any;
  access_token: any;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private tokenService: TokenService,
    private http: HttpClient
  ) {}

  
  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const sessionIdentifier = params['session'];

      if (sessionIdentifier) {
        // Make a request to your backend to get tokens using the session identifier
        this.http.get(`http://localhost:8888/get-tokens?session=${sessionIdentifier}`)
          .subscribe((tokenObj: any) => {
            if (tokenObj) {
              // Store the access token in localStorage

              localStorage.setItem('access_token', tokenObj.access_token);
              this.tokenService.setToken(tokenObj.access_token);
              this.refresh_token = tokenObj.refresh_token;
              // Optionally: Store the refresh token securely
              // this.tokenService.setToken(tokenObj.access_token);
            } else {
              console.log('Token object is null right now');
            }
          });
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
