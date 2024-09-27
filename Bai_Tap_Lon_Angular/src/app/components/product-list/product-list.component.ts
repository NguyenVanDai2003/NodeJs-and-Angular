import { query } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppService } from 'src/app/services/app.service';
declare var $:any;

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  id: any;
  cats : any = [];
  proDetail : any;
  products : any = [];
  constructor(private activatedRoute: ActivatedRoute, private app: AppService) { }

  ngOnInit(): void {
    this.app.getCategories().subscribe((res : any) => {
      this.cats = res.result;
    })
    this.activatedRoute.paramMap.subscribe((query: any) => {
      this.id = query.get('id');
      this.app.getProductsByCategoryId(this.id).subscribe((res : any) => {
        this.products = res.result;
      })
    })
    
  }
  showdt(pro: any){
    $('#modelId').modal();
    this.proDetail = pro;
    console.log(pro);
  }

}
