import { Injectable } from '@angular/core';
import { HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { startWith, tap } from 'rxjs';

@Injectable()
export class CacheInterceptor implements HttpInterceptor {

  private cache = new Map<string, HttpResponse<any>>();

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ) {

    if (!this.isCacheable(req)) {
      return next.handle(req);
    }

    const cachedResponse = this.cache.get(req.urlWithParams);

    // V1 - Return cache if present
    // return cachedResponse
    //   ? of(cachedResponse)
    //   : this.sendRequest(req, next)

    // V2 - Return cache first, then request
    return cachedResponse
      ? this.sendRequest(req, next).pipe(startWith(cachedResponse))
      : this.sendRequest(req, next);

  }

  private sendRequest(
    req: HttpRequest<any>,
    next: HttpHandler
  ) {
    return next.handle(req).pipe(
      tap(event => {
        if (event instanceof HttpResponse) {
          this.cache.set(req.urlWithParams, event);
        }
      })
    )
  }

  private isCacheable(req: HttpRequest<any>) {
    return req.method === 'GET';
  }
}
