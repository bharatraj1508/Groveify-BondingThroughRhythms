import { Component } from '@angular/core';
import { AlbumService } from 'src/app/services/album.service';


@Component({
  selector: 'app-artists',
  templateUrl: './artists.component.html',
  styleUrls: ['./artists.component.css']
})
export class ArtistsComponent {
  artists: any[] = [];
  artistId: string = '';
  
  constructor(
    private artistService: AlbumService,
  ) {}

    searchInput: string = '';

    submitForm() {
      console.log('User submitted:', this.searchInput);
  
      this.artistService.searchArtist(this.searchInput).subscribe(
        response => {
          console.log("API Response:", response); // Log the full API response
          this.artistId = response.artists.items[0].id;
    
          // After getting the artist's ID, call the getArtists method
          this.artistService.getArtists(this.artistId).subscribe(
            response => {
              // Ensure response is an array
              this.artists = response.items;
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
 
  
  