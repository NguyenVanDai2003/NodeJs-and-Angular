import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/services/app.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-favourite',
  templateUrl: './favourite.component.html',
  styleUrls: ['./favourite.component.css']
})
export class FavouriteComponent implements OnInit {
  products: any = this.app.getProducts();
  account: any = this.app.getAccount();
  favourite: any;
  constructor(private app: AppService) { }

  ngOnInit(): void {
    console.log(this.products.id)
    this.app.getFavouriteByAccount(this.account).subscribe((res: any) => {
      this.favourite = res.resul;
    })
  }
  remoFavourite(pro_id: number) {
    let acc_id = this.account.id;
    this.app.remoFavourite(acc_id, pro_id).subscribe((res: any) => {
      Swal.fire({
        title: res.result,
        icon: 'success'
      })
      location.assign('/favourite')
    })
  }
}
