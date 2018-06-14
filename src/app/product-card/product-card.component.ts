import { Component, OnInit, Input, Output,EventEmitter} from '@angular/core';
import { Product } from '../product.info';
import { ShopingCartService } from '../services/shoping-cart.service';
import { Item} from './cart-item';
import { DomSanitizer } from '@angular/platform-browser';


@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit {

  @Input('product')product:Product;
  quantity:Number=0;
  

  constructor(private cartService:ShopingCartService,private sanitizer:DomSanitizer) { }

  ngOnInit() {
    if(this.cartService.getCartID()){
    this.cartService.getProductQuantity(this.product.id).subscribe(res=> this.quantity=res);
    }
   
    //this.sanitizer.bypassSecurityTrustResourceUrl('data:image/jpg;base64,' +this.product.productImage);
    //this.image = this.sanitizer.bypassSecurityTrustResourceUrl('data:image/jpg;base64,' +this.product.productImage);
  }

  addToCart(){
    this.cartService.addToCart(this.product.id).subscribe(res=> this.quantity=res);
  } 

  

  removeFromCart(){
   
    this.cartService.removeFromCart(this.product.id).subscribe(res=> this.quantity=res);

  }

}
