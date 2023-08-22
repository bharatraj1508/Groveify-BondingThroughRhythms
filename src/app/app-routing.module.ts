import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from './dashboard/profile/profile.component';
import { AppComponent } from './app.component';
import { AlbumsComponent } from './pages/albums/albums.component';

const routes: Routes = [
  { path: 'landing-page', component: AppComponent },
  { path: 'user-info', component: ProfileComponent },
  { path: 'albums', component: AlbumsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
