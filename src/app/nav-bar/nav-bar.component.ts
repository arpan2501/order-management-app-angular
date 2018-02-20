import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SignUpService } from "../sign-up/sign-up.service";
import { UserInfo } from '../user.info';

@Component({
  selector: 'nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  userDetail:UserInfo;


  constructor(private router:Router,
  private signService:SignUpService)
  { }

  ngOnInit() {
    this.signService.userDetail.subscribe(res => this.userDetail=res);
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
