import {
  Component,
  ElementRef,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { ApifoodService } from './../../services/apifood.service';
@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
})
export class NavBarComponent implements OnInit {
  constructor(
    private _AuthService: AuthService,
    private _ApifoodService: ApifoodService,
    private _Renderer2:Renderer2
  ) {}
  @ViewChild('navBar') navbar!: ElementRef;
  isLogIn: boolean = true;
  userInfo: any;
  numberFav!: number;

  ngOnInit(): void {
    this._Renderer2.listen(window,'scroll',()=> {
      if(scrollY >= 200) {
        this._Renderer2.addClass(this.navbar.nativeElement,'fixed-top')
        this._Renderer2.addClass(this.navbar.nativeElement,'bg-light')
      }else {
        this._Renderer2.removeClass(this.navbar.nativeElement,'fixed-top')
        this._Renderer2.removeClass(this.navbar.nativeElement,'bg-light')

      }
    })
    this._AuthService.userData.subscribe({
      next: () => {
        if (this._AuthService.userData.getValue()) {
          this.isLogIn = true;
          this.userInfo = this._AuthService.userData.getValue();
        } else {
          this.isLogIn = false;
        }
      },
    });
    this._ApifoodService.curentNum.subscribe({
      next: () => {
        this.numberFav = this._ApifoodService.curentNum.getValue();
      },
    });
  }

  logOut(): void {
    this._AuthService.signOut();
  }
}
