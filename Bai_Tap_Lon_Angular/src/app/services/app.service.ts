import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
const api = 'http://localhost:3002/api';
@Injectable({
  providedIn: 'root'
})
export class AppService {
  // Repemdency injection

  constructor(private http: HttpClient) { }

  // danh sách Danh Mục
  getCategories() {
    return this.http.get(`${api}/category`);
  }
  // Danh sách sản phẩm   
    getProducts() {
      return this.http.get(`${api}/product`);
    }
    // Danh sách sản phẩm thoe danh mục
    getProductsByCategoryId(id: number) {
      return this.http.get(`${api}/product-by-category/${id}`);
    }
    //
    getProductsDetailById(id: number) {
      return this.http.get(`${api}/product${id}`);
    }
    // lấy accout
    checkLogin(data: any) {
      return this.http.post(`${api}/login`, data);
    }
    // lấy register
    checkRegister(data: any) {
      return this.http.post(`${api}/register`, data);
    }
    // favorite
    addFavorite(acc_id: number, pro_id: number) {
      let data = {
        account_id: acc_id,
        product_id: pro_id
      }
      return this.http.post(`${api}/favourite`, data);
    }
    checkIsFavourite(acc_id: number, pro_id: number): any {
      return this.http.get(`${api}/favourite/${acc_id}/${pro_id}`)
    }
    getCartTotalPrice() {
      let carts = this.GetCarts();
      let total: number = 0;
      carts.forEach((item: any) => {
        total += item.quantity * item.price;
      });
  
      return total;
    }
    getFavouriteByAccount(acc_id: number): any {
      return this.http.get(`${api}/favourite/${acc_id}`)
    }

    getAccount(): any {
      let acc = sessionStorage.getItem('login');
    if (acc) {
      return JSON.parse(acc);
    }
    }
    getCart(): any {
      let cart = sessionStorage.getItem('cart');
    if (cart) {
      return JSON.parse(cart);
    }else{
      return []
    }
    }
    saveCart (carts:any){
      let cartJson = JSON.stringify(carts);
      sessionStorage.setItem('cart', cartJson);
    }
   
    remoFavourite(acc_id: number, pro_id: number): any{
      return this.http.delete<any>(`${api}/favourite/${acc_id}/${pro_id}`)
    }
    GetCarts() {
      let cartJson = sessionStorage.getItem('cart');
      if (cartJson) {
        return JSON.parse(cartJson);
      } else {
        return [];
      }
    }
  
    getCartTotalQuantity() {
      let carts: any = this.GetCarts();
      let total: number = 0;
      carts.forEach((item: any) => {
        total += item.quantity;
      });
  
      return total;
    }

}
