import { Component } from '@angular/core';
import { AlbumService } from 'src/app/services/album.service';


@Component({
  selector: 'app-artists',
  templateUrl: './artists.component.html',
  styleUrls: ['./artists.component.css']
})
export class ArtistsComponent {
  artists: any[] = [];
  artist: string = '';
  
  constructor(
    private artistService: AlbumService,
  ) {}

    name: string = '';

    submitForm() {
      console.log('User submitted:', this.name);
  
      this.artistService.searchArtist(this.name).subscribe(
        response => {
          console.log("API Response:", response); // Log the full API response
          this.artist = response.artists.items[0].id;
          console.log(this.artist);
  
          // After getting the artist's ID, call the getArtists method
          this.artistService.getArtists(this.artist).subscribe(
            response => {
              console.log(response);
              // Ensure response is an array
              this.artists = response;
              console.log(this.artists);
            },
            error => {
              console.error(error);
            }
          );
        },
        error => {
          console.error("API Error:", error);
        }
      );
    }
  }
 
  
  