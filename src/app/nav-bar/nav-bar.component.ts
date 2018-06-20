import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SignUpService } from "../sign-up/sign-up.service";
import { UserInfo } from '../user.info';
import { ShopingCartService } from '../services/shoping-cart.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  userDetail:UserInfo;
  totalcartcount:Observable<Number>;

  constructor(private router:Router,
  private signService:SignUpService,
  public cartService:ShopingCartService)
  { }

  ngOnInit() {
    this.signService.userDetail.subscribe(res => this.userDetail=res);
   // this.totalcartcount = this.cartService.cartItemSubject.asObservable();
  }
  isIn : boolean = false;   // store state

  toggleState() { // click handler
    let bool = this.isIn;
    this.isIn = bool === false ? true : false;
  }

  gotoLogin() {

  this.router.navigate(['/login']);
  
  }

logOut() {

  this.signService.logOut();

  this.router.navigate(['/login']);

}



}
