import { Component, OnInit } from '@angular/core';
import { SignUpService } from '../../sign-up/sign-up.service';
import { Category } from '../../category.detail';
import { Product } from '../../product.info';
import { ProductFormValidators } from './product-form.validator';
import { FormGroup, FormControl, FormBuilder, Validators, ValidationErrors, AbstractControl } from "@angular/forms";
//import { CustomValidators } from 'ng2-validation';
import { Router,ActivatedRoute } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {

  productForm : FormGroup;

  categoryList:Category[];

  id;

  product:Product;


  productImage;
  productImagePreview;

  constructor(private categoryService:SignUpService,private fb:FormBuilder,
              private router:Router, private route: ActivatedRoute,
              private sanitizer:DomSanitizer) {
    this.createForm();
    this.id = this.route.snapshot.paramMap.get('id');
    if(this.id){
      categoryService.getProduct(this.id).subscribe(p => {

        this.product = p;

        this.productForm.get('productName').setValue(this.product.productName);
        this.productForm.get('price').setValue(this.product.price);
        this.productForm.get('categoryName').setValue(this.product.category.categoryName);

        this.productImage = this.product.productImage;
        console.log(this.productImage);
      })
    }



  }

  ngOnInit() {
    this.categoryService.getCategories().subscribe(res=>
        this.categoryList = res
    );
  }

  createForm(){
    this.productForm = this.fb.group({
      productName: ['', Validators.compose([Validators.required,ProductFormValidators.cannotContainSpace])],// <--- the FormControl called "name"
      price: ['',[Validators.required,ProductFormValidators.minimumPrice]],
      categoryName:['',Validators.required],
    //  imageURL:['',[Validators.required,CustomValidators.url]]
    });
  }


  onSubmit(value){
    const formData:FormData = new FormData();
    formData.append('productImage', this.productImage);
    formData.append('productInfo',JSON.stringify(value));
    console.log('ho-ah',formData);
    if(this.id){
     this.categoryService.updateProduct(formData,this.id);
     /*.subscribe(a=>
    {
        this.router.navigate(['admin/products']);
     }
     );*/
    }else{
      this.categoryService.saveProduct(formData);
     // this.router.navigate(['admin/products']);
  }

  }

  selectImage(event){
    console.log(event);
    this.productImage=event.target.files[0];
    if (event.target.files && event.target.files[0]) {
        var reader = new FileReader();
        reader.onload = (event: any) => {
        this.productImagePreview = event.target.result;
        console.log(event.target.result);
      }
       reader.readAsDataURL(event.target.files[0]);
    }
  }

}
