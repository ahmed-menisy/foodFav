import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApifoodService {
  constructor(private _HttpClient: HttpClient) {
     // To Get Fav Food When Run
     if (localStorage.getItem('FAVFOOD')) {
      const curentFav: any = localStorage.getItem('FAVFOOD');
      // console.log(JSON.parse(curentFav));
      const size:any = new Set(JSON.parse(curentFav));
      this.curentNum.next(size.size)

    }
  }
  curentNum: BehaviorSubject<any> = new BehaviorSubject(null);
  getSearch(word: string): Observable<any> {
    return this._HttpClient.get(
      `https://forkify-api.herokuapp.com/api/search?q=${word}`
    );
  }

  getFoodById(id: string | null): Observable<any> {
    return this._HttpClient.get(
      `https://forkify-api.herokuapp.com/api/get?rId=${id}`
    );
  }
}
