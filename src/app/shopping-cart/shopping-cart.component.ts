import { Component, OnInit } from '@angular/core';
import { ShopingCartService } from '../services/shoping-cart.service';
import { Item } from '../product-card/cart-item';
import { Observable } from 'rxjs';
import { MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {

  cartItems:Item[];
  totalPrice:Number=0;
  
  constructor(private cartService:ShopingCartService) { }

  ngOnInit() {
    this.cartService.getCartItems().subscribe(res=>{
      this.cartItems=res;
      this.getTotalPrice();
    });
  }

  getTotalPrice(){
    this.cartItems.forEach(item=>{
      this.addToToalPrice(item);
      })
  }

  addToCart(item:Item,index){
      
      this.cartItems[index].quantity=item.quantity.valueOf()+1;
      this.totalPrice = this.totalPrice.valueOf()+item.product.price.valueOf();
      this.cartService.addToCart(item.product.id).subscribe();
  }

  removeFromCart(item:Item,index){
    this.totalPrice = this.totalPrice.valueOf()-item.product.price.valueOf();
    if(item.quantity == 1){
      this.cartItems.splice(index, 1);
      this.cartService.deleteFromCart(item.product.id).subscribe();
    }else{
    this.cartService.removeFromCart(item.product.id).subscribe();
    this.cartItems[index].quantity=item.quantity.valueOf()-1;
    
    }
  }

  addToToalPrice(item){
    let price=item.quantity.valueOf()*item.product.price.valueOf();
      this.totalPrice=this.totalPrice.valueOf()+price.valueOf();
  }

  clearCart(){
    this.cartItems=[];
    this.totalPrice=0;
    this.cartService.clearItemsFromCart();
  }

}
