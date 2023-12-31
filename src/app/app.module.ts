import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { ProfileComponent } from './dashboard/profile/profile.component';
import { HeaderComponent } from './layout/header/header.component';
import { LandingPageComponent } from './layout/landing-page/landing-page.component';
import { NavbarComponent } from './layout/navbar/navbar.component';
import { ArtistsComponent } from './dashboard/artists/artists.component';
import { FormsModule } from '@angular/forms';
import { HomeComponent } from './dashboard/home/home.component';
import { ProcessingComponent } from './services/processingService/processing/processing.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    AppComponent,
    ProfileComponent,
    HeaderComponent,
    LandingPageComponent,
    NavbarComponent,
    ArtistsComponent,
    HomeComponent,
    ProcessingComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    RouterModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
