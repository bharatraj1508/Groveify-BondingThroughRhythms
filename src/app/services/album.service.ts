import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AlbumService {
  base_url: string = 'https://api.spotify.com/v1';

  constructor(private http: HttpClient) {}

  getCountries(): Observable<any> {
    const endpoint = "https://restcountries.com/v3.1/all";

   
    // Use the HttpClient to make the GET request
    return this.http.get(endpoint);
  }

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
    const endpoint = `${this.base_url}/search?q=${name}&type=artist`;

    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('access_token')}`,
    });
    // Use the HttpClient to make the GET request
    return this.http.get(endpoint, { headers: headers });
  }

  getArtist(id: string): Observable<any> {
    const endpoint = `${this.base_url}/artists/${id}`;
    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('access_token')}`,
    });

    // Use the HttpClient to make the GET request
    return this.http.get(endpoint, { headers: headers });
  }


  getArtistsAlbum(id: string): Observable<any> {
    const endpoint = `${this.base_url}/artists/${id}/albums`;
    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('access_token')}`,
    });

    // Use the HttpClient to make the GET request
    return this.http.get(endpoint, { headers: headers });
  }

  getArtistsTopTracks(id: string, country: string): Observable<any> {
    
    const endpoint = `${this.base_url}/artists/${id}/top-tracks?market=${country}`;

    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('access_token')}`,
    });

    // Use the HttpClient to make the GET request
    return this.http.get(endpoint, { headers: headers });
  }


  getRelatedArtists(id: string): Observable<any> {
    const endpoint = `${this.base_url}/artists/${id}/related-artists`;

    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('access_token')}`,
    });

    // Use the HttpClient to make the GET request
    return this.http.get(endpoint, { headers: headers });
  }
  getTopArtistsThismonth(range: string): Observable<any> {
    const endpoint = `${this.base_url}/me/top/artists?time_range=${range}&limit=10&offset=0`;

    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('access_token')}`,
    });

    return this.http.get(endpoint, { headers: headers });
  }

  getTopTracksThismonth(range: string): Observable<any> {
    const endpoint = `${this.base_url}/me/top/tracks?time_range=${range}&limit=10&offset=0`;

    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('access_token')}`,
    });

    return this.http.get(endpoint, { headers: headers });
  }
}
