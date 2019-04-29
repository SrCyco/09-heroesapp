import { Component, OnInit } from '@angular/core';
import { HeroesService } from 'src/app/services/heroes.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styles: []
})
export class HeroesComponent implements OnInit {

  heroes: any;
  loading:boolean = true;

  constructor(private heroesService: HeroesService) { 
    this.heroesService.getHeroes().subscribe( heroes => {
      console.log(heroes);
      this.heroes = heroes;
      this.loading = false;
    });
  }

  ngOnInit() {
  }
  borrarHeroe( key$: string ) {
    this.heroesService.borrarHeroe( key$ ).subscribe(response => {
      console.log(response);
      if (response) {
        console.error(response);
      } else {
        delete this.heroes[ key$ ];
      }
    })
  }
}
