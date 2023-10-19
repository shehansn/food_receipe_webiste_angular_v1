import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { HelperService } from 'src/app/services/helper.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isLoggedSub$!: Subscription;
  isLogged!: boolean;
  statusChecker!: number;
  username!: any;

  constructor(
    private router: Router,
    private helperService: HelperService,
  ) { }

  ngOnInit(): void {
    this.statusChecker = window.setInterval(() => this.tick(), 600000);
    let tokeninfo = this.helperService.isLoggedIn()
    if (tokeninfo.exp > Date.now() / 1000) {
      console.log('logged in')
      this.isLogged = true;
    } else {
      console.log('logged out')
      this.isLogged = false;
    }

    this.isLoggedSub$ = this.helperService.isUserLogged.subscribe((data) => {
      this.isLogged = data;
      console.log('isuserlogged',this.isLogged)
    });

  }

  tick(): void {
    let tokeninfo = this.helperService.isLoggedIn()
    if (tokeninfo.exp > Date.now() / 1000) {
      console.log('logged')
      this.isLogged = true;
    } else {
      console.log('logged out')
      this.isLogged = false;
    }
  }

  isUserLogged(): boolean {
    return this.isLogged;

  }

  logout() {
    this.username = undefined;
    this.helperService.clearSession();
    this.helperService.isUserLogged.next(false);
    console.log('logout')
    this.router.navigateByUrl('/user/login');

  }

  naviagetToLogin() {
    this.router.navigateByUrl('/user/login');
  }

}
