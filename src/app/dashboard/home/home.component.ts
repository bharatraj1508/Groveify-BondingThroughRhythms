import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  name: string = '';

  constructor() {}

  ngOnInit(): void {
    const user = localStorage.getItem('user_profile');
    if (user) {
      const user_profile = JSON.parse(user);
      this.name = user_profile.display_name;
    } else {
      console.log('No user exists');
    }
  }
}
