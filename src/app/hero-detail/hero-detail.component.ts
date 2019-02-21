import { Component, OnInit, Input } from '@angular/core';
import { Hero } from '../classes/hero';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { HeroService }  from '../services/hero.service';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit {

  // An input property is bound to and external component,
  // in this case the HeroComponent
  // @Input() hero: Hero;

  hero: Hero;

  // @Input() myInputProp: string;

  constructor(
    // The ActivatedRoute holds information about the route to this instance of the HeroDetailComponent.
    // We'll pull the id parameter from the route and store it in the private property 'route'
    private route: ActivatedRoute,

    // We'll call the HeroService with the id from the ActivatedRoute service to display the details of our Hero.
    private heroService: HeroService,

    // Location is an Angular service for interacting with the browser.
    private location: Location
  ) { }

  ngOnInit() {
    this.getHero();
  }


  getHero(): void {
    // Route parameters are always strings. The JavaScript (+) operator converts the string to a number, 
    // which is what a hero id should be.
    const id = +this.route.snapshot.paramMap.get('id');
    this.heroService.getHero(id)
      .subscribe(hero => this.hero = hero);
  }

  goBack(): void {
    this.location.back();
  }

  save(): void{
    this.heroService.updateHero(this.hero)
      .subscribe(() => this.goBack());
  }
}
