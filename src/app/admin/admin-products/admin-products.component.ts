import { Component, OnInit, Inject, AfterViewInit, ViewChild } from '@angular/core';
import { SignUpService } from "../../sign-up/sign-up.service";
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { CategoryDialogComponent } from '../component-dialog/component-dialog.component';
import { HttpClient } from "@angular/common/http";
import { Category } from '../../category.detail';
import { Product } from '../../product.info';
import {MatTableDataSource, MatSort} from '@angular/material';
import {PageEvent} from '@angular/material';
import { ProductPageTO } from '../../productPage.detail';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit {
  displayedColumns = ['productName', 'price', 'symbol'];
  product:Product;
  productList:Product[];
  categoryList:Category[];

  pageSize:number = 1;
  pageSizeOptions = [1,2,3];
  pageIndex:number = 0;
  allProductLength:number;


  dataSource = new MatTableDataSource(this.productList);

  @ViewChild(MatSort) sort: MatSort;


  /**
   * Set the sort after the view init since this component will
   * be able to query its view for the initialized sort.
   */
 ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

pageclcickEvent(event:PageEvent){
    console.log(event);
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;

    this.prodService.getProducts(this.pageIndex,this.pageSize).subscribe( products => {

    this.productList=products['productList'];

    this.allProductLength = products['allProductLength'];

    this.dataSource.data = this.productList;

      });
}


  constructor(private prodService:SignUpService,
    public dialog: MatDialog,private http:HttpClient) {


  }

  ngOnInit() {

    this.prodService.getProducts(this.pageIndex,this.pageSize).subscribe( products => {
//    console.log(products);
//    console.log(products['productList']);
   this.productList=products['productList'];

  this.allProductLength = products['allProductLength'];
//  console.log(this.productList);

//    this.dataSource = new MatTableDataSource(this.productList);
//    this.dataSource.sort = this.sort;
    this.dataSource.data = this.productList;

  });

 this.prodService.getCategories().subscribe(categories => {
    this.categoryList = categories;
    console.log(this.categoryList);
  });


  }


  openDialog(): void {
    let dialogRef = this.dialog.open(CategoryDialogComponent, {
      width: '250px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed',result);
      this.categoryList.push({categoryName:result});
      console.log(this.categoryList);
    });
  }

}
