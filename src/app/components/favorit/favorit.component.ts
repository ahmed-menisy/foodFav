import { Component, OnInit } from '@angular/core';
import { ApifoodService } from './../../services/apifood.service';

@Component({
  selector: 'app-favorit',
  templateUrl: './favorit.component.html',
  styleUrls: ['./favorit.component.scss'],
})
export class FavoritComponent implements OnInit {
  constructor(private _ApifoodService: ApifoodService) {}
  favFood: any[] = [];
  curentId: string[] = [];
  ngOnInit(): void {
    this._ApifoodService.curentNum.getValue();
    const fav: any = localStorage.getItem('FAVFOOD');
    this.curentId = JSON.parse(fav);
    console.log(this.curentId);
    this.curentId.forEach((id) => {
      this._ApifoodService.getFoodById(id).subscribe({
        next: (response) => {
          this.favFood.push(response.recipe);
        },
      });
    });
  }
}
