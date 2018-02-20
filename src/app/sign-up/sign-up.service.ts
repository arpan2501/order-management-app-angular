import { HttpClient } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { JwtHelper } from "angular2-jwt";
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import { UserInfo } from '../user.info';
import { Category } from '../category.detail';
import { Product } from '../product.info';
import { ProductPageTO } from '../productPage.detail';
import {Observable} from 'rxjs';

@Injectable()
export class SignUpService {

  private userInfo = new BehaviorSubject<UserInfo>(this.refreshLoggedIn());
  userDetail = this.userInfo.asObservable();

  constructor(private http:HttpClient) { }


  registerNewUser(signUpDetails){

    this.http.post('api/registerUser',signUpDetails).subscribe();

  }


  getToken(user){
     return this.http.post('api/performLogin',user,{observe: 'response'});
  }

  isLoggedIn(){
    let user:UserInfo;
    user = {
      isLoggedIn:false
    }
    let jwtHelper = new JwtHelper();
     let token = localStorage.getItem('token');
     if(token){
      let jwtToken = token.slice(8);
      let isExpired = jwtHelper.isTokenExpired(jwtToken);
      if(!isExpired){
      let decodeToken = jwtHelper.decodeToken(token);
      user = {
        isLoggedIn:!isExpired,
        userName:decodeToken.sub,
        userRole:decodeToken.roles[0]
      }
      console.log(decodeToken);
      }
    }
      console.log(user);
     this.userInfo.next(user);
  }

//Page Refresh
refreshLoggedIn(){
  let user:UserInfo;
  user = {
    isLoggedIn:false
  }
  let jwtHelper = new JwtHelper();
   let token = localStorage.getItem('token');
   if(token){
    let jwtToken = token.slice(8);
    let isExpired = jwtHelper.isTokenExpired(jwtToken);
    if(!isExpired){
    let decodeToken = jwtHelper.decodeToken(token);
    user = {
      isLoggedIn:!isExpired,
      userName:decodeToken.sub,
        userRole:decodeToken.roles[0]
    }
    console.log(decodeToken);
  }
  }
    console.log(user);
  return user;
}

logOut() {
	localStorage.removeItem('token');
  let user:UserInfo = {
    isLoggedIn:false
  }
   this.userInfo.next(user);
}

saveCategory(category){
  console.log('Category going to save!',category);
  this.http.post('api/saveCategory',category).subscribe();
}

getCategories():Observable<Category[]>{
  return this.http.get<Category[]>('api/categories');
}

getProducts(pageSize,pageNumber):Observable<ProductPageTO[]>{
  return this.http.get<ProductPageTO[]>('api/products/'+pageSize+'/'+pageNumber);
}

getProduct(id:number):Observable<Product>{
  return this.http.get<Product>('api/product/'+id);
}

saveProduct(product){
  this.http.post('api/saveProduct',product).subscribe();
}

updateProduct(product,productId){
  return this.http.post('api/updateProduct'+productId,product);
}

getHomeProducts(categoryType,pageSize,pageNumber):Observable<ProductPageTO[]>{
  return this.http.get<ProductPageTO[]>('api/homeProducts/'+categoryType+'/'+pageSize+'/'+pageNumber);
}


}
