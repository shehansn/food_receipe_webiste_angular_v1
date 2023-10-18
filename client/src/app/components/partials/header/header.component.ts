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

  isLoggedSub$!: Subscription ;
  isLogged!: boolean;
  statusChecker!: number;

  constructor(
    private router: Router,
    private helperService: HelperService,
  ) { }

  ngOnInit(): void {
    this.statusChecker = window.setInterval(() => this.tick(), 600000);

  }

  tick(): void {
    let tokeninfo = this.helperService.isLoggedIn()
    if (tokeninfo.exp > Date.now() / 1000) {
      this.isLogged = true;
    } else {
      this.isLogged = false;
    }
  }

  isUserLogged(): boolean {
    return this.isLogged;

  }

}
