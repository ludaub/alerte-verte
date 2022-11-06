import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

import { Observable, map } from 'rxjs';

import { Article } from './article';
import { Category } from './category';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  categories: Record<string, Category> = {
    agriculture: {
      name: 'Agriculture',
      icon: 'agriculture',
      color: '#ffcdd2',
    },
    biodiversity: {
      name: 'Biodiversité',
      icon: 'emoji_nature',
      color: '#ef9a9a',
    },
    climate: {
      name: 'Climat',
      icon: 'device_thermostat',
      color: '#e57373',
    },
    demography: {
      name: 'Démographie',
      icon: 'group',
      color: '#ef5350',
    },
    economy: {
      name: 'Économie',
      icon: 'euro_symbol',
      color: '#f44336',
    },
    energy: {
      name: 'Énergie',
      icon: 'bolt',
      color: '#e53935',
    },
  };

  articles: Array<Article> = [
    {
      title:
        'Les populations d’oiseaux, de poissons, de mammifères, d’amphibiens et de reptiles ont décliné de 69 % en moins de 50 ans',
      quote:
        'Un indicateur publié par le Fonds mondial pour la nature (WWF) témoigne de l’érosion continue de la biodiversité.',
      url: 'https://www.lemonde.fr/planete/article/2022/10/13/les-populations-de-vertebres-ont-decline-de-69-en-moins-de-cinquante-ans_6145561_3244.html',
      publishedAt: new Date(2022, 10, 13),
      publishedBy: 'Le Monde',
      categoryId: 'biodiversity',
    },
  ];

  isSmallScreen$: Observable<boolean> = this.breakpointObserver
    .observe([Breakpoints.XSmall, Breakpoints.Small])
    .pipe(map((result) => result.matches));

  constructor(private breakpointObserver: BreakpointObserver) {}
}
