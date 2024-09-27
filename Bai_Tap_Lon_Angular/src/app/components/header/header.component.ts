import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from 'src/app/services/app.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  // totalQuantity: number = 0;
  carts: any = this.app.getCart();
  account: any;
  constructor(private app: AppService) { }
   

  totalQuantity: number = this.app.getCartTotalQuantity()
  totalPrice: number = this.app.getCartTotalPrice()
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
  ngOnInit(): void {
    let acc = sessionStorage.getItem('login');
    if (acc) {
      this.account = JSON.parse(acc);
    }
    
  }
  onLogout() {
    sessionStorage.clear();
    location.assign('/')
  }
}
