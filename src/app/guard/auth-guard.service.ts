import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { SignUpService } from '../sign-up/sign-up.service';
import { UserInfo } from '../user.info';


@Injectable()
export class AuthGuard implements CanActivate {

  user:UserInfo;

  constructor(private signUpService:SignUpService,
  private router:Router) { }


canActivate(){
  this.signUpService.userDetail.subscribe( user => this.user=user);
  if(this.user.isLoggedIn && this.user.userRole == 'ROLE_ADMIN'){
    return true;
  }
  else{
    this.router.navigate(['/login']);
    return false;
  }
}



}
