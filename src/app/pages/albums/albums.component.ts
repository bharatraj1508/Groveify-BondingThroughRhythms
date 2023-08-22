import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlbumService } from 'src/app/services/album.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-albums',
  templateUrl: './albums.component.html',
  styleUrls: ['./albums.component.css']
})
export class AlbumsComponent {
  albums: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private albumService: AlbumService,
    private tokenService: TokenService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      const acc = params['t'];
      const ref = params['r'];

      if (acc) {
        // Store the access token
        localStorage.setItem('access_token', acc);
        this.tokenService.setToken(acc); // Notify TokenService about the token
        console.log(acc);
      } else {
        console.log('Token object is null right now');
      }
    });
  }
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

