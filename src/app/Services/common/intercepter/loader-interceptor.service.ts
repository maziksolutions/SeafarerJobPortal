import { Injectable } from '@angular/core';
import {
  HttpResponse,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, finalize, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { LoaderService } from '../services/loader.service';
@Injectable({
  providedIn: 'root'
})
export class LoaderinterceptorService implements HttpInterceptor {
  private requests: HttpRequest<any>[] = [];
  constructor(private loaderService: LoaderService, public router: Router) { }

  removeRequest(req: HttpRequest<any>) {
    const i = this.requests.indexOf(req);
    if (i >= 0) {
      this.requests.splice(i, 1);
    }
    this.loaderService.setLoadingStatus(this.requests.length > 0);
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.requests.push(req);
    this.loaderService.setLoadingStatus(true);
    return next.handle(req).pipe(
      tap(
        event => {
          if (event instanceof HttpResponse) {
            this.removeRequest(req);
          }
        },
        error => {         
          console.error('Network error:', error);
          this.removeRequest(req);
        }
      ),
      catchError((error: HttpErrorResponse) => {       
        this.removeRequest(req);
        return throwError(() => error);
      }),
      finalize(() => {
        this.removeRequest(req);
      })
    );
  }
}