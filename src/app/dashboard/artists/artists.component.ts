import { Component } from '@angular/core';
import { AlbumService } from 'src/app/services/album.service';

@Component({
  selector: 'app-artists',
  templateUrl: './artists.component.html',
  styleUrls: ['./artists.component.css']
})
export class ArtistsComponent {
  artist: any = {};
  albums: any[] = [];
  topTracks: any[] = [];
  temp : number = 0;

  constructor(private albumService: AlbumService) {}

  searchInput: string = '';

  submitForm() {

    this.temp = 1;
    this.albumService.searchArtist(this.searchInput).subscribe(
      artistResponse => {
        if (artistResponse.artists.items.length > 0) {
          const artistId = artistResponse.artists.items[0].id;

          this.albumService.getArtist(artistId).subscribe(
            artistData => {

              this.artist = artistData;
              console.log('Artist:', this.artist);
            },
            error => {
              console.error('Failed to get artist data:', error);
            }
          );


          this.albumService.getArtistsAlbum(artistId).subscribe(
            artistAlbums => {

              this.albums = artistAlbums.items;
              console.log('Albums:', this.albums);
            },
            error => {
              console.error('Failed to get artist albums:', error);
            }
          );

          this.albumService.getArtistsTopTracks(artistId).subscribe(
            topTracksResponse => {

              var tempTracks: any[] = [];
              this.topTracks = topTracksResponse.tracks;
              console.log('Top Tracks:', this.topTracks);
            },
            error => {
              console.error('Failed to get top tracks:', error);
            }
          );
        } else {
          console.log('No artists found.');
          this.artist = [];
          this.albums= [];
          this.topTracks = [];
        }
      },
      error => {
        console.error('API Error:', error);
      }
    );
  }
}
