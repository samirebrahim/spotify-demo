import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest
} from '@angular/common/http';
import { Observable } from 'rxjs/';

import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class SpotifyInterceptService implements HttpInterceptor {
  constructor(private tokenSvc: TokenService) {}

  public intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const authReq = req.clone({ setHeaders: this.tokenSvc.authHeader });
    return next.handle(authReq);
  }
}
