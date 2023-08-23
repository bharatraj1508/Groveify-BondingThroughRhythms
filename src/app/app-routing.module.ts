import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from './dashboard/profile/profile.component';
import { AppComponent } from './app.component';
import { AlbumsComponent } from './dashboard/albums/albums.component';
import { ArtistsComponent } from './dashboard/artists/artists.component';

const routes: Routes = [
  { path: 'landing-page', component: AppComponent },
  { path: 'user-info', component: ProfileComponent },
  { path: 'albums', component: AlbumsComponent},
  { path: 'artists', component: ArtistsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
