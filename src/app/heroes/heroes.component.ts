import { Component, OnInit } from '@angular/core';
import { Hero } from '../classes/hero';
import { HeroService } from '../services/hero.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['../app.component.css', './heroes.component.css']
})
export class HeroesComponent implements OnInit {

  // selectedHero: Hero;

  jadesProperty = "Jade's special property";

  heroes: Hero[];

  // Reserve the constructor for simple initialization such as wiring constructor parameters to properties.
  constructor(private heroService: HeroService) { }

  ngOnInit() {
    //this.getHeroesFauxAsync();
    this.getHeroes();
  }

  // onSelect(hero: Hero): void {
  //   this.selectedHero = hero;
  // }

  // This example synchronously calls the data access layer. NEVER USE!!!
  // getHeroes(): void {
  //   this.heroes = this.heroService.getHeroes();
  // }

  // This example still uses in memory data but simulates it with class from the rxjs library.
  // getHeroesFauxAsync(): void {
  //   this.heroService.getHeroesFauxAsync()
  //     .subscribe(heroes => this.heroes = heroes)
  // }

  // Still using data in memory, but now it's simulated by the in memory Web API created by the HttpClientInMemoryWebApiModule.
  getHeroes(): void{
    this.heroService.getHeroes()
      .subscribe(heroes => this.heroes = heroes)
  }
}
