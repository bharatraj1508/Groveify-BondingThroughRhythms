import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AlbumService {
  base_url: string = 'https://api.spotify.com/v1';

  constructor(private http: HttpClient) {}

  getAlbums(): Observable<any> {
    const id = '4aawyAB9vmqN3uQ7FjRGTy';
    const endpoint = `${this.base_url}/albums/${id}`;

    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('access_token')}`,
    });
    console.log(headers);
    // Use the HttpClient to make the GET request
    return this.http.get(endpoint, { headers: headers });
  }

  searchArtist(name: string): Observable<any> {
    console.log(name);
    const endpoint = `${this.base_url}/search?q=${name}&type=artist`;

    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('access_token')}`,
    });
    // Use the HttpClient to make the GET request
    return this.http.get(endpoint, { headers: headers });
  }

  getArtists(id: string): Observable<any> {
    console.log(id);
    const endpoint = `${this.base_url}/artists/${id}/albums`;

    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('access_token')}`,
    });

    // Use the HttpClient to make the GET request
    return this.http.get(endpoint, { headers: headers });
  }

  getTopArtistsThismonth(): Observable<any> {
    const endpoint = `${this.base_url}/me/top/artists?time_range=short_term&limit=10&offset=0`;

    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('access_token')}`,
    });

    return this.http.get(endpoint, { headers: headers });
  }

  getTopTracksThismonth(): Observable<any> {
    const endpoint = `${this.base_url}/me/top/tracks?time_range=short_term&limit=10&offset=0`;

    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('access_token')}`,
    });

    return this.http.get(endpoint, { headers: headers });
  }
}
