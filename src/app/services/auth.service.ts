import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import jwtDecode from 'jwt-decode';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private _HttpClient: HttpClient,private _Router:Router) {
    this.saveUserData();
  }
  baseUrl: string = 'https://route-egypt-api.herokuapp.com/';
  userData: BehaviorSubject<any> = new BehaviorSubject(null);
  encodeToken: any;
  // ============================== SignUp
  signUp(data: object): Observable<any> {
    return this._HttpClient.post(this.baseUrl + 'signup', data);
  }
  // ============================== SignIn
  signIn(data: object): Observable<any> {
    return this._HttpClient.post(this.baseUrl + 'signin', data);
  }
  // ============================== SignOut
  signOut() {
    this._HttpClient.post(this.baseUrl, { token: this.encodeToken });
    localStorage.removeItem('TOKEN-FOOD');
    this.userData.next(null);
    this._Router.navigate(['/home'])
  }
  // ============================== Save User Data
  saveUserData(): void {
    if (localStorage.getItem('TOKEN-FOOD')) {
      this.encodeToken = localStorage.getItem('TOKEN-FOOD');
      const decodeToken: object = jwtDecode(this.encodeToken);
      this.userData.next(decodeToken);
    }
  }
}
