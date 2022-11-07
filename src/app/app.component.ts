import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

import { Observable, map } from 'rxjs';

import { AppService } from './app.service';
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

  articles$: Observable<Array<Article>> = this._service.articles$;

  isSmallScreen$: Observable<boolean> = this._breakpointObserver
    .observe([Breakpoints.XSmall, Breakpoints.Small])
    .pipe(map((result) => result.matches));

  constructor(
    private _breakpointObserver: BreakpointObserver,
    private _service: AppService
  ) {}
}
