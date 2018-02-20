import { Component, OnInit, Input} from '@angular/core';
import { SignUpService } from '../../sign-up/sign-up.service';
import { Category } from '../../category.detail';

@Component({
  selector: 'product-filter',
  templateUrl: './product-filter.component.html',
  styleUrls: ['./product-filter.component.css']
})
export class ProductFilterComponent implements OnInit {

  categoryList:Category[];
  @Input('category')category;
  constructor(private homeService:SignUpService) {

    this.homeService.getCategories().subscribe(res=>
        this.categoryList = res
    );
  }


  ngOnInit() {
  }

}
