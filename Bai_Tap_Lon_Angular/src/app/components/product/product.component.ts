import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/services/app.service';
import Swal from 'sweetalert2';
declare var $:any;

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  cats : any = [];
  carts: any = this.app.getCart();
  proDetail : any;
  products : any = [];
constructor(private app: AppService) { }

ngOnInit(): void {
  this.app.getCategories().subscribe((res : any) => {
    console.log(res.result);
    this.cats = res.result;
  })

  this.app.getProducts().subscribe((res : any) => {
    console.log(res.result);
    this.products = res.result;
  })

}
showdt(pro: any){
  $('#modelId').modal();
  this.proDetail = pro;
  console.log(pro);
}
addToCart(pro:any){
  let index  = this.carts.findIndex((item: any) => {
    return item.id = pro.id;
    
  })
  console.log('pro.id',pro.id);
  if(index >= 1){
    this.carts[index].quantity +=1;
  }else{
    let cartItem: any = {
      id: pro.id,
      name: pro.name,
      image: pro.image,
      price: pro.sale_price ? pro.sale_price : pro.price,
      quantity: 1
    }
    console.log('this.carts',this.carts)
    this.carts.push(cartItem)
  }
   
    this.app.saveCart(this.carts);
    Swal.fire({
         title: 'Thêm vào giỏ hàng thành công',
        icon: 'success'
      });

}

}
