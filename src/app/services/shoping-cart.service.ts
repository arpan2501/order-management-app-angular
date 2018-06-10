import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../product.info';
import { Item } from '../product-card/cart-item';
import { mergeMap } from 'rxjs/operators';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {  Observable } from 'rxjs';


@Injectable()
export class ShopingCartService {
  
  
  cartItemSubject:BehaviorSubject<Number>;
  

  constructor(private http:HttpClient) {
    if(this.getCartID())
    this.getCartItemsCount().subscribe(res=>{
      this.cartItemSubject=new BehaviorSubject<Number>(res);
    });
    else
    this.cartItemSubject=new BehaviorSubject<Number>(0);
   }

 

  createCartId(){
    return this.http.get("api/createCart");
  }

   addToCart(productId:Number){
    this.cartItemSubject.next(this.cartItemSubject.value.valueOf()+1);
     //Get Cart ID from local storage and save the item for the ID
    

    if(this.getCartID())
    return this.addProduct(this.getCartID(),productId);

      //Else Generate the cart ID
    /*  this.createCartId().subscribe(res=>{
      localStorage.setItem("cartID",res["id"])
      return this.addProduct(res["id"],product.id);*/

    return  this.createCartId().mergeMap( res =>
          this.addProduct(res["id"],productId)
      );


  }


  private addProduct(shoppingCartId:string,productId:Number){
    this.setCartID(shoppingCartId);
    return this.updateProductCart(shoppingCartId,productId,'add');
  
  }

  removeFromCart(productId:Number){
    this.cartItemSubject.next(this.cartItemSubject.value.valueOf()-1);
    let cartID = this.getCartID();
    return this.updateProductCart(cartID,productId,'remove');
  }

  private updateProductCart(cartID:string,productId:Number,change:string){
    return this.http.get<Number>('api/updateProductItem/'+cartID+'/'+productId+'/'+change);
  }

  getProductQuantity(productId){
    let cartID = this.getCartID();
    return this.http.get<Number>('api/getProductQuantity/'+cartID+'/'+productId);
  }


  getCartID(){
    return localStorage.getItem("cartID");
  }

  private setCartID(cartID){
    localStorage.setItem("cartID",cartID);
  }

  private getCartItemsCount(){
    return this.http.get<Number>('/api/getCartItemsCount/'+this.getCartID());
  }

  getCartItems(){
    return this.http.get<Item[]>('/api/getCartItems/'+this.getCartID());
  }

  deleteFromCart(productId:number){
    this.cartItemSubject.next(this.cartItemSubject.value.valueOf()-1);
    return this.http.delete('/api/deleteItem/'+this.getCartID()+'/'+productId);
  }

  clearItemsFromCart(){
    this.cartItemSubject.next(0);
    this.http.delete('/api/clearCart/'+this.getCartID()).subscribe();
  }


}
