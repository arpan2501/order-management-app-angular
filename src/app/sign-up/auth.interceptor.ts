import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { JwtHelper } from "angular2-jwt";
import { Router } from '@angular/router';
import 'rxjs/add/operator/do';


@Injectable()
export class AuthInterceptor implements HttpInterceptor{

   constructor(private router: Router) {}

  intercept( req: HttpRequest<any>, next : HttpHandler):Observable<HttpEvent<any>>{
    const idToken = localStorage.getItem('token');
    if(idToken){
          let jwtHelper = new JwtHelper();
          let jwtToken = idToken.slice(8);
          let isExpired = jwtHelper.isTokenExpired(jwtToken);

      const cloned = req.clone({
        headers:req.headers.set("Authorization",idToken)
      });
    return  next.handle(cloned).do(event => {
        }, error => {
            if (error instanceof HttpErrorResponse && error.status === 403) {
                if(isExpired){
                  localStorage.removeItem('token');
                }
                this.router.navigate([ '/login' ]);
            }
            return error;
        });
    }
    else{
    return  next.handle(req);
    }
  }

}
