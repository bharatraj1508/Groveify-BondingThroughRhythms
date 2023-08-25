import { Component } from '@angular/core';
import { AlbumService } from 'src/app/services/album.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent {
  userProfile: any;
  topArtistItems: any[] = [];
  topTracksItems: any[] = [];
  selectedOption = 'short_term';

  constructor(private albumService: AlbumService) {}

  ngOnInit(): void {
    const user = localStorage.getItem('user_profile');
    if (user) {
      this.userProfile = JSON.parse(user);
    } else {
      console.log('No user exists');
    }

    this.albumService.getTopArtistsThismonth().subscribe((res) => {
      this.topArtistItems = res.items;
    });

    this.albumService.getTopTracksThismonth().subscribe((res) => {
      this.topTracksItems = res.items;
      console.log(this.topTracksItems);
    });
  }

  onChange() {
    console.log(this.selectedOption);
  }
}
