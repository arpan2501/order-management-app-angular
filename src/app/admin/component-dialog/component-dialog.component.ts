import { Component, OnInit } from '@angular/core';
import { SignUpService } from '../../sign-up/sign-up.service';

@Component({
  selector: 'category-dialog',
  templateUrl: './component-dialog.component.html',
  styleUrls: ['./component-dialog.component.css']
})
export class CategoryDialogComponent implements OnInit {

  categoryName:string;

  constructor(private signUpService:SignUpService) { }

  ngOnInit() {
  }

  saveCategory(){
    console.log('Category will be saved!!!!');
    this.signUpService.saveCategory(this.categoryName);
  }

}
