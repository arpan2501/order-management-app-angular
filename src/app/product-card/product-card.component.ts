import { Component, OnInit, Input, Output,EventEmitter} from '@angular/core';
import { Product } from '../product.info';
import { ShopingCartService } from '../services/shoping-cart.service';
import { Item} from './cart-item';


@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit {

  @Input('product')product:Product;
  quantity:Number=0;

  constructor(private cartService:ShopingCartService) { }

  ngOnInit() {
    if(this.cartService.getCartID()){
    this.cartService.getProductQuantity(this.product.id).subscribe(res=> this.quantity=res);
    }
  }

  addToCart(){
    this.cartService.addToCart(this.product.id).subscribe(res=> this.quantity=res);
  } 
}
