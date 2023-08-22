import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from './dashboard/profile/profile.component';
import { AppComponent } from './app.component';

const routes: Routes = [
  { path: 'landing-page', component: AppComponent },
  { path: 'user-info', component: ProfileComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
