import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Hero } from './hero';
import { HeroService } from './hero.service';

@Component({
  moduleId: module.id,
  selector: 'my-heros',
  providers: [HeroService],
  templateUrl: './heros.component.html',
  styleUrls: ['./heros.component.css'],
})

export class HerosComponent implements OnInit {
  heros: Hero[];
  selectedHero: Hero;

  constructor(
    private router: Router,
    private heroSerivce: HeroService,
  ) { }

  ngOnInit(): void {
    this.getHeros();
  }

  onSelect(hero: Hero): void {
    this.selectedHero = hero;
  }

  getHeros(): void {
    this.heroSerivce.getHeros().then(heros => this.heros = heros);
  }

  gotoDetail(): void {
    this.router.navigate(['/detail', this.selectedHero.id]);
  }

  add(name: string): void {
    name = name.trim();
    if (!name) {
      return;
    }
    this.heroSerivce.create(name)
      .then(hero => {
        this.heros.push(hero);
        this.selectedHero = null;
      });
  }

  delete(hero: Hero): void {
    this.heroSerivce.delete(hero.id)
      .then(() => {
        this.heros = this.heros.filter(h => h !== hero);
        if (this.selectedHero == hero) {
          this.selectedHero = null;
        }
      });
  }
}