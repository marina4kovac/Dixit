import { Injectable, InjectionToken, Inject } from '@angular/core';
import { HttpHandler, HttpRequest, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

export const API_URL = new InjectionToken<string>('apiUrl');

@Injectable({
  providedIn: 'root'
})
export class ApiUrlInterceptorService implements HttpInterceptor {
  constructor(@Inject(API_URL) private _apiUrl: string) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    req = req.clone({ url: this._prepareUrl(req.url) });
    return next.handle(req);
  }

  private _isAbsoluteUrl(url: string): boolean {
    const absolutePattern = /^https?:\/\//i;
    return absolutePattern.test(url);
  }

  private _prepareUrl(url: string): string {
    url = this._isAbsoluteUrl(url) ? url : this._apiUrl + '/' + url;
    return url.replace(/([^:]\/)\/+/g, '$1');
  }
}
