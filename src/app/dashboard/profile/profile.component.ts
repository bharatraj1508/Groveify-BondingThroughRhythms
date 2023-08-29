import { Component } from '@angular/core';
import { AlbumService } from 'src/app/services/album.service';
import { ViewChild } from '@angular/core';
import { ElementRef } from '@angular/core';
import { forkJoin } from 'rxjs';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent {
  userProfile: any;
  topArtistItems: any[] = [];
  topTracksItems: any[] = [];
  track_range = 'short_term';
  artist_range = 'short_term';
  artist_text = 'this month';
  track_text = 'this month';
  mostListenedArtist: any;
  mostListenedTrack: any;
  publicPlaylist: any = {};

  @ViewChild('artist') artist!: ElementRef<HTMLSelectElement>;
  @ViewChild('track') track!: ElementRef<HTMLSelectElement>;

  constructor(private albumService: AlbumService) {}

  ngOnInit(): void {
    const user = localStorage.getItem('user_profile');
    if (user) {
      this.userProfile = JSON.parse(user);
    } else {
      console.log('No user exists');
    }

    const topArtists$ = this.albumService.getTopArtistsThismonth(
      this.artist_range
    );
    const topTracks$ = this.albumService.getTopTracksThismonth(
      this.track_range
    );
    const mostListenedArtist$ =
      this.albumService.getTopArtistsThismonth('long_term');
    const mostListenedTrack$ =
      this.albumService.getTopTracksThismonth('long_term');

    const publicPlaylist$ = this.albumService.getCurrentUserPlaylist();

    forkJoin([
      topArtists$,
      topTracks$,
      mostListenedArtist$,
      mostListenedTrack$,
      publicPlaylist$.pipe(
        map((res) => {
          const publicpublicPlaylist = res.items.filter(
            (item: any) => item.public === true
          );

          return {
            ...res,
            items: publicpublicPlaylist,
          };
        })
      ),
    ]).subscribe(
      ([
        topArtistsRes,
        topTracksRes,
        mostListenedArtistRes,
        mostListenedTrackRes,
        publicPlaylistRes,
      ]) => {
        this.topArtistItems = topArtistsRes.items;
        this.topTracksItems = topTracksRes.items;
        this.mostListenedArtist = mostListenedArtistRes.items[0];
        this.mostListenedTrack = mostListenedTrackRes.items[0];
        this.publicPlaylist = publicPlaylistRes;
        console.log(this.publicPlaylist);
      }
    );
  }

  onChange() {
    this.artist_text =
      this.artist.nativeElement.options[
        this.artist.nativeElement.selectedIndex
      ].text;

    this.track_text =
      this.track.nativeElement.options[
        this.track.nativeElement.selectedIndex
      ].text;

    this.albumService
      .getTopArtistsThismonth(this.artist_range)
      .subscribe((res) => {
        this.topArtistItems = res.items;
      });

    this.albumService
      .getTopTracksThismonth(this.track_range)
      .subscribe((res) => {
        this.topTracksItems = res.items;
      });
  }
}
