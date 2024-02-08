import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable, catchError, tap, throwError } from 'rxjs';

@Injectable()
export class errorInterceptor implements HttpInterceptor {
  constructor(private toastr:ToastrService) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    console.log('Outgoing request', req);
    return next.handle(req).pipe(
      tap((event:HttpEvent<any>) => {
        if(event instanceof HttpResponse) this.toastr.success("authorized",event.status.toString());
      }),
      catchError((error: HttpErrorResponse) => {
        console.error('error occured: ', error);
        if(error.status === 404){
          this.toastr.error("unauthorized",error.status.toString());
        }
        throw error;
      })
    );
  }
  // intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
  //   console.log('Outgoing request' ,req);
  //   return next.handle(req).pipe(
  //     tap({
  //       next(value) {
  //         if(value instanceof HttpResponse){
  //           return 'Succeeded';
  //         }
  //         else{
  //           return '';
  //         }
  //       },
  //       error(err) {
  //         return 'Failed'
  //       },
  //     }),
  //   )
    
  // }
}
