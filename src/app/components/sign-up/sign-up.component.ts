import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from './../../services/auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit {
  constructor(private _AuthService:AuthService, private _Router:Router) {}
  ngOnInit(): void {}
  isLoading:boolean = false;
  msgError!:string
  // Sign Up FormGroup
  signUp: FormGroup = new FormGroup({
    first_name: new FormControl(null, [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(20),
      Validators.pattern(/^[a-zA-Z\s]\w{1,20}$/),
    ]),
    last_name: new FormControl(null, [
      Validators.required,
      Validators.pattern(/^[a-zA-Z\s]\w{1,20}$/),
    ]),
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(8),
    ]),
    age: new FormControl(null, [
      Validators.required,
      Validators.min(10),
      Validators.max(80),
    ]),
  });
  // Sign UP SubMit
  subSignUp(formData: FormGroup): void {
    if(formData.valid) {
    this.isLoading = true
      console.log(formData);
      this._AuthService.signUp(formData.value).subscribe({
        next:(response)=>{
          if(response.message == 'success') {
            this._Router.navigate(['/login'])
          }else {
            this.msgError = response.errors.email.message
          }
        },complete:()=> {
          this.isLoading = false;
        }
      })
    }
  }
}
