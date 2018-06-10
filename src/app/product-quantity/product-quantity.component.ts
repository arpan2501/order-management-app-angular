import { Component, OnInit, Input } from '@angular/core';
import { Product } from '../product.info';
import { Item } from '../product-card/cart-item';
import { ShopingCartService } from '../services/shoping-cart.service';

@Component({
  selector: 'product-quantity',
  templateUrl: './product-quantity.component.html',
  styleUrls: ['./product-quantity.component.css']
})
export class ProductQuantityComponent implements OnInit {

  @Input('productId')productId:Number;
  @Input('quantity')quantity:Number;

  item:Item;

  constructor(private cartService:ShopingCartService) { }

  ngOnInit() {
    if(this.cartService.getCartID()){
    this.cartService.getProductQuantity(this.productId).subscribe(res=> this.quantity=res);
    }
  }

  addToCart(){
   
    this.cartService.addToCart(this.productId).subscribe(res=> this.quantity=res);
   
  }

  removeFromCart(){
   
    this.cartService.removeFromCart(this.productId).subscribe(res=> this.quantity=res);

  }

}
