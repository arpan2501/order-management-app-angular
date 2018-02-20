import { Component, OnInit } from '@angular/core';
import { SignUpService } from '../../sign-up/sign-up.service';
import { Category } from '../../category.detail';
import { Product } from '../../product.info';
import { ProductFormValidators } from './product-form.validator';
import { FormGroup, FormControl, FormBuilder, Validators, ValidationErrors, AbstractControl } from "@angular/forms";
import { CustomValidators } from 'ng2-validation';
import { Router,ActivatedRoute } from '@angular/router';

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


  constructor(private categoryService:SignUpService,private fb:FormBuilder,
              private router:Router, private route: ActivatedRoute ) {
    this.createForm();
    this.id = this.route.snapshot.paramMap.get('id');
    if(this.id){
      categoryService.getProduct(this.id).subscribe(p => {

        this.product = p;

        this.productForm.get('productName').setValue(this.product.productName);
        this.productForm.get('price').setValue(this.product.price);
        this.productForm.get('categoryName').setValue(this.product.category.categoryName);
        this.productForm.get('imageURL').setValue(this.product.imageURL);

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
      imageURL:['',[Validators.required,CustomValidators.url]]
    });
  }


  onSubmit(value){
    if(this.id){
     this.categoryService.updateProduct(value,this.id).subscribe(a=>
    {
        this.router.navigate(['admin/products']);
     }
     );
    }else{
      this.categoryService.saveProduct(value);
      this.router.navigate(['admin/products']);
  }

  }

}
