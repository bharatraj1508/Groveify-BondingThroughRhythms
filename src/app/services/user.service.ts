import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'; // Import HttpHeaders
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  endpoint: string = 'https://api.spotify.com/v1/me';

  constructor(private http: HttpClient) {}

  getUserProfile(): Observable<any> {
    // Set the headers with the Authorization token
    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('access_token')}`,
    });

    // Use the HttpClient to make the GET request
    return this.http.get(this.endpoint, { headers: headers });
  }
}
