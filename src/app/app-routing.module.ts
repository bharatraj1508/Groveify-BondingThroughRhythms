import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from './dashboard/profile/profile.component';
import { AlbumsComponent } from './dashboard/albums/albums.component';
import { ArtistsComponent } from './dashboard/artists/artists.component';
import { HomeComponent } from './dashboard/home/home.component';
import { AuthGuard } from './services/auth.guard';
import { ProcessingComponent } from './services/processingService/processing/processing.component';
import { LandingPageComponent } from './layout/landing-page/landing-page.component';

const routes: Routes = [
  { path: '', component: LandingPageComponent },
  { path: 'processing', component: ProcessingComponent },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: 'albums', component: AlbumsComponent, canActivate: [AuthGuard] },
  { path: 'artists', component: ArtistsComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
