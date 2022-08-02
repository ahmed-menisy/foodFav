import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApifoodService } from './../../services/apifood.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})
export class DetailsComponent implements OnInit {
  constructor(
    private _ActivatedRoute: ActivatedRoute,
    private _ApifoodService: ApifoodService
  ) {}
  curentId!: any;
  recipie:any = []
  ngOnInit(): void {
    this.curentId = this._ActivatedRoute.snapshot.paramMap.get('id')
    this.getFoodByIf();
  }
  getFoodByIf(): void {
    this._ApifoodService.getFoodById(this.curentId).subscribe({
      next: (response) => {
        console.log(response.recipe);
        this.recipie = response.recipe
      },
    });
  }
}
