import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AppService } from 'src/app/services/app.service';
declare var $:any;
import Swal from 'sweetalert2'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  cats: any = [];
  carts: any = this.app.getCart();
  error: string = '';
  proDetail: any;
  products: any = [];
  account: any;
  account_id: any = [];
  formLogin: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required)
  });
  data: any;
  
  getProducts() {
    this.app.getProducts().subscribe((res: any) => {
      let pros = res.result.map((item: any) => {
        this.app.checkIsFavourite(this.account_id,item.id).subscribe((res: any) => {
          item.isFavorite = res.result;
        });

        return item;
      });

      this.products = pros;
    })
  }
  constructor(private app: AppService) { }

  ngOnInit(): void {
    console.log(this.carts)
    this.account = this.app.getAccount();
    console.log(this.account)
    this.account_id = this.account ? this.account.id: 0;
    this.app.getCategories().subscribe((res: any) => {
      this.cats = res.result;
    })

    this.getProducts();
    
  }
  showModal(pro: any) {
    this.proDetail = pro;
  }

  get f() {
    return this.formLogin.controls
  }
  
  onLogin() {

    if (this.formLogin.invalid) {return;}

    this.app.checkLogin(this.formLogin.value).subscribe((res: any) => {
      if (res.result) {
        sessionStorage.setItem('login', JSON.stringify(res.result));
        // this.routr.navigate(['/']);
        location.assign('/');
      } else {
        this.error = "Tài khoản không hợp lệ"
      }
    });

  }

  // yêu thích
  addFavorite(pro_id: number) {
    
    if(!this.account_id){
      $('#modal-login').modal('show');
    }else{
      this.app.addFavorite(this.account.id, pro_id).subscribe((res: any) => {
        // alert(res.result)
        this.getProducts();
        Swal.fire({
          title: res.result,
          icon: 'success',
          // confirmButtonText: 'Cool'
        })
      })
    }
  }
  showdt(pro: any){
    $('#modelId').modal();
    this.proDetail = pro;
    console.log(pro);
  }
  
   //addtocart

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

document.addEventListener('DOMContentLoaded', function() {
  const itemsPerPage: number = 4;
  let currentPage: number = 1;

  interface Product {
      name: string;
      oldPrice: string;
      newPrice: string;
      imageUrl: string;
  }

  const products: Product[] = [
      { name: "Cà chua nè", oldPrice: "300.000đ", newPrice: "150.000đ", imageUrl: "http://icdn.dantri.com.vn/zoom/1200_630/2019/05/18/ca-chua-1558139604071.jpg" },
      { name: "Quýt", oldPrice: "600.000đ", newPrice: "300.000đ", imageUrl: "https://toigingiuvedep.vn/wp-content/uploads/2021/08/tong-hop-hinh-anh-qua-dau-tay-do-mong-dep-va-dang-yeu-nhat.jpg" },
      { name: "Dâu tây loại 1", oldPrice: "300.000đ", newPrice: "200.000đ", imageUrl: "https://toigingiuvedep.vn/wp-content/uploads/2021/08/tong-hop-hinh-anh-qua-dau-tay-do-mong-dep-va-dang-yeu-nhat.jpg" },
      { name: "Cà chua nè", oldPrice: "300.000đ", newPrice: "150.000đ", imageUrl: "http://icdn.dantri.com.vn/zoom/1200_630/2019/05/18/ca-chua-1558139604071.jpg" },
      // Add more products if needed
  ];

  function renderProducts(page: number): void {
      const start: number = (page - 1) * itemsPerPage;
      const end: number = start + itemsPerPage;
      const paginatedProducts: Product[] = products.slice(start, end);

      const productContainer: HTMLElement | null = document.getElementById('product-list');
      if (productContainer) {
          productContainer.innerHTML = paginatedProducts.map(product => `
              <div class="col-md-3">
                  <div class="jumbotron">
                      <div class="container">
                          <div class="product">
                              <div class="product__avt" style="background-image: url(${product.imageUrl});"></div>
                              <div class="product__info">
                                  <h3 class="product__name">${product.name}</h3>
                                  <div class="product__price">
                                      <div class="price__old">${product.oldPrice}</div>
                                      <div class="price__new">${product.newPrice}</div>
                                  </div>
                                  <div class="product__sale">
                                      <span class="product__sale-percent">50%</span>
                                      <span class="product__sale-text">Giảm</span>
                                  </div>
                              </div>
                              <a href="product.html" class="viewDetail">Xem chi tiết</a>
                              <a href="cart.html" class="addToCart">Thêm vào giỏ</a>
                          </div>
                      </div>
                  </div>
              </div>
          `).join('');
          
          const pageNumber: HTMLElement | null = document.getElementById('page-number');
          if (pageNumber) {
              pageNumber.textContent = `Page ${page}`;
          }

          const prevButton: HTMLButtonElement | null = document.getElementById('prev') as HTMLButtonElement;
          const nextButton: HTMLButtonElement | null = document.getElementById('next') as HTMLButtonElement;
          
          if (prevButton) {
              prevButton.disabled = page === 1;
          }

          if (nextButton) {
              nextButton.disabled = end >= products.length;
          }
      }
  }

  function setupPagination(): void {
      const prevButton: HTMLButtonElement | null = document.getElementById('prev') as HTMLButtonElement;
      const nextButton: HTMLButtonElement | null = document.getElementById('next') as HTMLButtonElement;
      
      if (prevButton) {
          prevButton.addEventListener('click', function() {
              if (currentPage > 1) {
                  currentPage--;
                  renderProducts(currentPage);
              }
          });
      }
      
      if (nextButton) {
          nextButton.addEventListener('click', function() {
              if (currentPage * itemsPerPage < products.length) {
                  currentPage++;
                  renderProducts(currentPage);
              }
          });
      }
      
      renderProducts(currentPage);
  }

  setupPagination();
});

