import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/services/app.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
carts: any = this.app.getCart();
totalQuantity: number = this.app.getCartTotalQuantity()
totalPrice: number = this.app.getCartTotalPrice()

  constructor(private app: AppService) { } 

  ngOnInit(): void {
  }
  updateQuantity(idx: number, ev: any) {
    let newQuantity = parseInt(ev.target.value);
    newQuantity = newQuantity > 0 ? newQuantity : 1;
    newQuantity = newQuantity < 100 ? newQuantity : 99;
    ev.target.value = newQuantity;
    this.carts[idx].quantity = newQuantity;
    this.app.saveCart(this.carts)
    this.totalQuantity = this.app.getCartTotalQuantity()
  this.totalPrice = this.app.getCartTotalPrice()
  this.carts.changeData({
    quantity: this.app.getCartTotalQuantity()
  })
  this.app.saveCart(this.carts);
  }
  updateQtt(idx: number, ev: any){
    let qtt = ev.target.value >0 ?ev.target.value:1
    this.carts[idx].quantity =qtt
    ev.target.value =  qtt
    this.app.saveCart(this.carts);
    }
    removeCart(idx: number){
      if(confirm('Chắc không')){
        this.carts.splice(idx, 1);
      this.app.saveCart(this.carts);
      }
    } 
    clearCart(){
      if(confirm('Chắc không')){
        sessionStorage.clear();
        this.carts = [];
      }
    }
}
