import {
  HttpEvent,
  HttpEventType,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { LoadingService } from 'src/app/services/loading.service';

var pendingRequests = 0;

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {


  constructor(private loadingService: LoadingService) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    this.loadingService.showLoading();

   pendingRequests = pendingRequests + 1;

    return next.handle(request).pipe(
      tap({
        next: (event) => {
          if (event.type === HttpEventType.Response) {
            this.handleHideLoading();
          }
        },
        error: (_) => {
          this.handleHideLoading();
        }
      })
    );
  }

  handleHideLoading() {
    pendingRequests = pendingRequests - 1;
    if (pendingRequests === 0)
      this.loadingService.hideLoading();
  }

}
