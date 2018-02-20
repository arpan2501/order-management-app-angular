import { SignUpService } from "../sign-up/sign-up.service";
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from "@angular/forms";
import {Router} from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

 logInForm : FormGroup;

	invalidLogin:boolean;
  constructor(private signUpService:SignUpService, private fb:FormBuilder,
  private router: Router) {
  this.createForm();
   }

  ngOnInit() {
  }


  createForm() {
    this.logInForm = this.fb.group({
      username: ['', Validators.required],// <--- the FormControl called "name"

      password: ['',Validators.required]

    });
  }

  onSubmit(credentials){
  console.log(credentials);
   this.signUpService.getToken(credentials).subscribe(
    result => {
   	localStorage.setItem('token',result.headers.get('authorization'));
   	this.router.navigate(['/']);
   	this.signUpService.isLoggedIn();
   }, (err: HttpErrorResponse) => {
   	  this.invalidLogin = true;
      if (err.error instanceof Error) {
        // A client-side or network error occurred. Handle it accordingly.
        console.log('An error occurred:', err.error.message);
      } else {
        // The backend returned an unsuccessful response code.
        // The response body may contain clues as to what went wrong,
        console.log(`Backend returned code ${err.status}, body was: ${err.error}`);
      }
    }
   );

  }


}
