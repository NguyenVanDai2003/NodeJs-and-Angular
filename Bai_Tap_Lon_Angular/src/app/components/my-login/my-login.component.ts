import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppService } from 'src/app/services/app.service';
import Swal from 'sweetalert2'


@Component({
  selector: 'app-my-login',
  templateUrl: './my-login.component.html',
  styleUrls: ['./my-login.component.css']
})
export class MyLoginComponent implements OnInit {
  error: string = '';
  formLogin: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required)
  });
  
  constructor(private app: AppService, private router: Router) { }

  ngOnInit(): void {
  }

  get f() {
    return this.formLogin.controls
  }
  
  onLogin() {

    if (this.formLogin.invalid) {return;}

    this.app.checkLogin(this.formLogin.value).subscribe((res: any) => {
      if (res.result) {
        sessionStorage.setItem('login', JSON.stringify(res.result));
        // this.router.navigate(['/']);
        location.assign('/');
      } else {
        this.error = "Tài khoản không hợp lệ";
        Swal.fire({
          title: "Tài khoản không hợp lệ!",
          icon: 'warning',  
        })
      }
    });

  }

}
