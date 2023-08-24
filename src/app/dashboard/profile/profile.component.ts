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

  constructor(private albumService: AlbumService) {}

  ngOnInit(): void {
    const user = localStorage.getItem('user_profile');
    if (user) {
      this.userProfile = JSON.parse(user);
    } else {
      console.log('No user exists');
    }

    this.albumService.getTopArtistThismonth().subscribe((res) => {
      this.topArtistItems = res.items;
      console.log(this.topArtistItems);
    });
  }
}
