import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { HomeComponent } from './home/home.component';
import { ProductsComponent } from './products/products.component';
import { CheckOutComponent } from './check-out/check-out.component';
import { OrderSuccessComponent } from './order-success/order-success.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';
import { AdminProductsComponent } from './admin/admin-products/admin-products.component';
import { AdminOrdersComponent } from './admin/admin-orders/admin-orders.component';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { SignUpService } from "./sign-up/sign-up.service";
import { AuthGuard } from './guard/auth-guard.service';
import { LoginGuard } from './guard/login-guard.service';
import { AuthInterceptor } from "./sign-up/auth.interceptor";
import { HttpClientModule } from "@angular/common/http";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ProductFormComponent } from './admin/product-form/product-form.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { MatDialogModule,MatSelectModule,MatSortModule,MatTableModule,MatButtonModule } from '@angular/material';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatInputModule} from '@angular/material/input';
import {MatCardModule} from '@angular/material/card';
import { CategoryDialogComponent } from './admin/component-dialog/component-dialog.component';
import { CustomFormsModule } from 'ng2-validation';


const appRoute:Routes = [
{path:'',component:HomeComponent},
  {path:'products',component:ProductsComponent},
  {path:'shoppingcart',component:ShoppingCartComponent},
  {
    path:'my/orders',
    component:MyOrdersComponent,
    canActivate:[LoginGuard]
  },
  {path:'shoppingcart',component:ShoppingCartComponent},
  {path:'check-out',component:CheckOutComponent},
  {path:'order-success',component:OrderSuccessComponent},
  {path:'login',component:LoginComponent},
  {path:'sign-up',component:SignUpComponent},
  {
      path:'admin/products/new',
      component:ProductFormComponent,
      canActivate:[AuthGuard]
  },
  {
      path:'admin/products/:id',
      component:ProductFormComponent,
      canActivate:[AuthGuard]
  },
  {
    path:'admin/products',
    component:AdminProductsComponent,
    canActivate:[AuthGuard]
  },
  {
    path:'admin/orders',
    component:AdminOrdersComponent,
    canActivate:[AuthGuard]
  }
]


@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    ShoppingCartComponent,
    HomeComponent,
    ProductsComponent,
    CheckOutComponent,
    OrderSuccessComponent,
    MyOrdersComponent,
    AdminProductsComponent,
    AdminOrdersComponent,
    LoginComponent,
    SignUpComponent,
    ProductFormComponent,
    CategoryDialogComponent
  ],entryComponents:[
    CategoryDialogComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatInputModule,
    MatSelectModule,
    MatCardModule,
    MatSortModule,
    MatButtonModule,
    MatTableModule,
    MatPaginatorModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    CustomFormsModule,
    NgbModule.forRoot(),
    RouterModule.forRoot(
    appRoute
    )
  ],
  providers: [SignUpService,
    AuthGuard,
    LoginGuard,{
    provide:HTTP_INTERCEPTORS,
    useClass:AuthInterceptor,
    multi:true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
