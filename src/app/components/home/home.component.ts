import { Component, OnInit } from '@angular/core';
import { ApifoodService } from './../../services/apifood.service';
import { AuthService } from './../../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor(
    private _ApifoodService: ApifoodService,
    private _AuthService: AuthService
  ) {}
  allSearch: string = `carrot
  broccoli
  asparagus
  cauliflower
  corn
  cucumber
  green pepper
  lettuce
  mushrooms
  onion
  potato
  pumpkin
  red pepper
  tomato
  beetroot
  brussel sprouts
  peas
  zucchini
  radish
  sweet potato
  artichoke
  leek
  cabbage
  celery
  chili
  garlic
  basil
  coriander
  parsley
  dill
  rosemary
  oregano
  cinnamon
  saffron
  green bean
  bean
  chickpea
  lentil
  apple
  apricot
  avocado
  banana
  blackberry
  blackcurrant
  blueberry
  boysenberry
  cherry
  coconut
  fig
  grape
  grapefruit
  kiwifruit
  lemon
  lime
  lychee
  mandarin
  mango
  melon
  nectarine
  orange
  papaya
  passion fruit
  peach
  pear
  pineapple
  plum
  pomegranate
  quince
  raspberry
  strawberry
  watermelon
  salad
  pizza
  pasta
  popcorn
  lobster
  steak
  bbq
  pudding
  hamburger
  pie
  cake
  sausage
  tacos
  kebab
  poutine
  seafood
  chips
  fries
  masala
  paella
  som tam
  chicken
  toast
  marzipan
  tofu
  ketchup
  hummus
  chili
  maple syrup
  parma ham
  fajitas
  champ
  lasagna
  poke
  chocolate
  croissant
  arepas
  bunny chow
  pierogi
  donuts
  rendang
  sushi
  ice cream
  duck
  curry
  beef
  goat
  lamb
  turkey
  pork
  fish
  crab
  bacon
  ham
  pepperoni
  salami
  ribs`;
  msgError!: string;
  searchList: string[] = this.allSearch.split(' ');
  recipes: any[] = [];
  isClicked: boolean = false;
  favFoodId: Set<any> = new Set();
  isLogin: boolean = false;
  isLoading: boolean = false;
  ngOnInit(): void {
    this._AuthService.userData.subscribe({
      next: () => {
        if (this._AuthService.userData.getValue()) {
          this.isLogin = true;
        } else {
          this.isLogin = false;
        }
      },
    });
    this.isLoading = true;
    // Response When Open Default
    this._ApifoodService.getSearch('pizza').subscribe({
      next: (response) => {
        console.log(response.recipes);
        this.recipes = response.recipes;
      },
      error: (e) => {
        console.log(e.error.error);
      },
      complete: () => {
        this.isLoading = false;
      },
    });
    // To Get Fav Food When Run
    if (localStorage.getItem('FAVFOOD')) {
      const curentFav: any = localStorage.getItem('FAVFOOD');
      // console.log(JSON.parse(curentFav));
      this.favFoodId = new Set(JSON.parse(curentFav));
    }
  }
  // Get Search
  getSearch(e: any): void {
    this.isLoading = true;
    console.log(e.target.value);
    this._ApifoodService.getSearch(e.target.value).subscribe({
      next: (response) => {
        console.log(response.recipes);
        this.recipes = response.recipes;
      },
      error: (e) => {
        console.log(e.error.error);
      },
      complete: () => {
        this.isLoading = false;
      },
    });
  }
  //Track By
  trackFood(index: number, recipes: any): number {
    return recipes.index;
  }
  // Fav icon
  changFav(recipieId: string): void {
    console.log(recipieId);

    // this.isClicked = !this.isClicked;
    if (this.favFoodId.has(recipieId)) {
      this.favFoodId.delete(recipieId);
    } else {
      this.favFoodId.add(recipieId);
    }
    console.log(this.favFoodId);
    localStorage.setItem('FAVFOOD', JSON.stringify(Array.from(this.favFoodId)));
    this._ApifoodService.curentNum.next(this.favFoodId.size);
    console.log(this.favFoodId.size);
  }
}
