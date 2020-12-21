import { Global } from './../../global/global';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less'],
})
export class HomeComponent implements OnInit {
  isCollapsed = false;
  constructor(private router: Router) {}

  ngOnInit(): void {
    if (localStorage.getItem(Global.JWT_KEY) == null) {

      this.router.navigate(['/login']);
    }
  }

  logOut() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
