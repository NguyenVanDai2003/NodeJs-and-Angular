import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AppService } from 'src/app/services/app.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  error: string = '';
  formRegister: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email, Validators.minLength(12)]),
    name: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });
  constructor(private app: AppService) { }

  ngOnInit(): void {
  }
  // hàm trả về các control của form
  get f() {return this.formRegister.controls;}

  onRegister() {
    if(this.formRegister.invalid) {return}; // nếu sai thì return
    this.app.checkRegister(this.formRegister.value).subscribe((res: any) => {
      if(res.status ==  true ){
        location.assign('/login');
      }else
        this.error = "Tài khoản đã tồn tại";
    })
  }

}
