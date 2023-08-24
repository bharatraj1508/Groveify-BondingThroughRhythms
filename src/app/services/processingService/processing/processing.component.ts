import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TokenService } from 'src/app/services/token.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-processing',
  templateUrl: './processing.component.html',
  styleUrls: ['./processing.component.css'],
})
export class ProcessingComponent {
  constructor(
    private route: ActivatedRoute,
    private tokenService: TokenService,
    private http: HttpClient,
    public router: Router
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
              const user = JSON.stringify(res.user_profile);

              // Store the response containing user information, access and referesh token in localStorage
              localStorage.setItem('user_profile', user);
              localStorage.setItem('access_token', res.access_token);
              localStorage.setItem('referesh_token', res.referesh_token);

              this.tokenService.setToken(res.access_token);
              this.router.navigate(['/home'], { replaceUrl: true });
            } else {
              console.log('No user for found');
            }
          });
      }
    });
  }
}
