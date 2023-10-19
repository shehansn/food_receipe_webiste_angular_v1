import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HelperService } from 'src/app/services/helper.service';
import { UserService } from 'src/app/services/user.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private userService: UserService, private heplerService: HelperService) { }


  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const user = this.userService.currentUser;
    if (this.heplerService.isLoggedIn()) {
      if (user.token) {
        request = request.clone({
          setHeaders: {
            // 'Accept': 'application/json',
            // 'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + user.token
          }
        })
      }
    }
    return next.handle(request);
  }
}
