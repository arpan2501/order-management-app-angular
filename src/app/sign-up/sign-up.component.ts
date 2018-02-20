import { SignUpService } from "./sign-up.service";
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from "@angular/forms";


@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  constructor(private signUpService:SignUpService, private fb:FormBuilder) {
  this.createForm();
  }

  ngOnInit() {

  }

  signUpForm : FormGroup;

//    ({
//    userName : new FormControl(),
//    email : new FormControl(),
//    password : new FormControl,
//    confirmPassword : new FormControl()
//
//  });


  createForm() {
    this.signUpForm = this.fb.group({
      userName: ['', Validators.required],// <--- the FormControl called "name"
      email: ['',Validators.required],
      password: ['',Validators.required],
      confirmPassword: ['',Validators.required],
    });
  }

  onSubmit(signUpDetails){
  this.signUpService.registerNewUser(signUpDetails);
  }
}
