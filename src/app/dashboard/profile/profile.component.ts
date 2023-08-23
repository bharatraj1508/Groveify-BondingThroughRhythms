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
  access_token: any;

  constructor(
    private route: ActivatedRoute,
    private tokenService: TokenService,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      const sessionIdentifier = params['session'];

      if (sessionIdentifier) {
        // Make a request to your backend to get tokens using the session identifier
        this.http
          .get(`http://localhost:8888/get-tokens?session=${sessionIdentifier}`)
          .subscribe((res: any) => {
            if (res) {
              const response = JSON.stringify(res);

              // Store the response containing user information, access and referesh token in localStorage
              localStorage.setItem('user-info-tokens', response);

              this.userProfile = res.user_profile;
              this.tokenService.setToken(res.access_token);
            } else {
              console.log('No user for found');
            }
          });
      } else {
        const user_info_tokens = localStorage.getItem('user-info-tokens');
        if (user_info_tokens) {
          var user = JSON.parse(user_info_tokens);
        } else {
          console.log('No user exists');
        }
        this.userProfile = user.user_profile;
      }
    });
  }

  // ngAfterViewInit(): void {
  //   this.userProfile = localStorage.getItem('user-profile');
  // }
}
