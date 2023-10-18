import { Injectable } from '@angular/core';
import jwt_decode from "jwt-decode";
import { Subject } from 'rxjs';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class HelperService {
  isUserLogged = new Subject<boolean>();
  favRecipesStatus = new Subject<string>();
  userObj!: any;


  constructor(
    private userService: UserService
  ) {
    userService.userObservable.subscribe((newUser) => {
      this.userObj = newUser;
    })
  }

  isLoggedIn(): any {
    try {
      const tokenInfo = jwt_decode(this.userObj.token); // decode token
      console.log('isLoggedIn', tokenInfo); // show decoded token object in console
      return tokenInfo;

    } catch (err) {
      return false;
    }
  }
}
