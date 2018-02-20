import { Component, OnInit } from '@angular/core';
import { SignUpService } from '../sign-up/sign-up.service';
import { Product } from '../product.info';
import { Category } from '../category.detail';
import { ActivatedRoute } from '@angular/router';
import {PageEvent} from '@angular/material';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  category:string;
  categoryList:Category[];
  pageSize:number=2;
  pageIndex:number=0;
  defaultCategory:string = 'All';
  pageSizeOptions = [1,2,3];

  productlist:Product[];
  totalProductCount:number;

  constructor(private homeService:SignUpService,private route:ActivatedRoute) {

    this.homeService.getCategories().subscribe(res=>
        this.categoryList = res
    );

    this.route.queryParamMap.subscribe(params => {

        this.pageIndex = 0;

        this.category = params.get('category');

        this.categoricalSelect();

    });
  }

  ngOnInit() {

  }

  pageclcickEvent(event:PageEvent){
      console.log(event);
      this.pageSize = event.pageSize;
      this.pageIndex = event.pageIndex;

      this.categoricalSelect();

  }

  categoricalProduct(cat){
    this.homeService.getHomeProducts(cat,this.pageSize,this.pageIndex).subscribe(
    productTO => {
    this.productlist = productTO['productList'];
    this.totalProductCount = productTO['allProductLength'];
    });
  }

  categoricalSelect(){
    if(!this.category || this.category==this.defaultCategory){
        this.categoricalProduct(this.defaultCategory);
    }
    else{
        this.categoricalProduct(this.category);
    }
  }


}
