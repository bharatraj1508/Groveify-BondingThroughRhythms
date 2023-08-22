import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlbumService {


  id = "4aawyAB9vmqN3uQ7FjRGTy";
  endpoint: string = `https://api.spotify.com/v1/albums/${this.id}`;

  constructor(private http: HttpClient) {}

  getAlbums(): Observable<any> {
    // Set the headers with the Authorization token
    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('access_token')}`,
    });

    // Use the HttpClient to make the GET request
    return this.http.get(this.endpoint, { headers: headers });
  }
}
