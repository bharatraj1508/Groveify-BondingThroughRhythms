import { Component } from '@angular/core';
import { AlbumService } from 'src/app/services/album.service';


@Component({
  selector: 'app-albums',
  templateUrl: './albums.component.html',
  styleUrls: ['./albums.component.css']
})
export class AlbumsComponent {
  albums: any[] = [];

  constructor(
    private albumService: AlbumService,
  ) {}

  
  ngAfterViewInit(): void {
    this.albumService.getAlbums().subscribe({
      next: (response) => {
        console.log(response);
         // Ensure response is an array
     
          this.albums = response;
          console.log(this.albums)
        
      },
      error: (error) => {
        console.error(error);
      },
    });
  }
}

