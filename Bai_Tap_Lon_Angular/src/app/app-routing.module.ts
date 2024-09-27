import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './components/about/about.component';
import { FavouriteComponent } from './components/favourite/favourite.component';
import { HomeComponent } from './components/home/home.component';
import { LienheComponent } from './components/lienhe/lienhe.component';
import { MyLoginComponent } from './components/my-login/my-login.component';
import { NewsComponent } from './components/news/news.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductComponent } from './components/product/product.component';
import { RegisterComponent } from './components/register/register.component';
import { CartComponent } from './components/cart/cart.component';

const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'product', component: ProductComponent},
  { path: 'about', component: AboutComponent},
  { path: 'my-login', component: MyLoginComponent},
  { path: 'category/:id', component: ProductListComponent},
  { path: 'product-detail/:id', component: ProductDetailComponent },
  { path: 'news', component: NewsComponent},
  { path: 'register', component: RegisterComponent},
  { path: 'lienhe', component: LienheComponent},
  { path: 'favourite', component: FavouriteComponent},
  { path: 'cart', component: CartComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
