import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.scss'],
})
export class LogInComponent implements OnInit {
  constructor(private _AuthService: AuthService, private _Router: Router) {}
  ngOnInit(): void {}
  isLoading: boolean = false;
  msgError!: string;
  // Sign Up FormGroup
  logIn: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(8),
    ]),
  });
  // Sign UP SubMit
  subLogIn(formData: FormGroup): void {
    if (formData.valid) {
      this.isLoading = true;
      console.log(formData);
      this._AuthService.signIn(formData.value).subscribe({
        next: (response) => {
          if (response.message == 'success') {
            localStorage.setItem('TOKEN-FOOD',response.token)
            this._AuthService.saveUserData();
            this._Router.navigate(['/home']);
          } else {
            this.msgError = response.message;
          }
        },
        complete: () => {
          this.isLoading = false;
        },
      });
    }
  }
}
