import { Component } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent {
  userProfile: any;

  constructor() {}

  ngOnInit(): void {
    const user = localStorage.getItem('user_profile');
    if (user) {
      this.userProfile = JSON.parse(user);
    } else {
      console.log('No user exists');
    }
  }
}
