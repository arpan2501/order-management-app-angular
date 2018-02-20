import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { SignUpService } from "../sign-up/sign-up.service";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
  encapsulation : ViewEncapsulation.None
})
export class ProductsComponent implements OnInit {

  constructor() {


  }

  ngOnInit() {
  }

}
