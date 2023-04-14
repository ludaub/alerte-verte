import { animate, style, transition, trigger } from '@angular/animations';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import {
  AsyncPipe,
  DatePipe,
  KeyValuePipe,
  NgIf,
  NgFor,
} from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatLegacyButtonModule } from '@angular/material/legacy-button';
import { MatLegacyCardModule } from '@angular/material/legacy-card';
import { MatLegacyListModule } from '@angular/material/legacy-list';
import { MatLegacyTooltipModule } from '@angular/material/legacy-tooltip';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';

import { Observable, Subject, combineLatest, map, takeUntil } from 'rxjs';

import { Article } from './article';
import { categories } from './categories';
import { Category } from './category';
import { Month } from './month';
import { Store } from './store.service';

@Component({
  standalone: true,
  selector: 'av-root',
  imports: [
    AsyncPipe,
    DatePipe,
    FormsModule,
    KeyValuePipe,
    MatIconModule,
    MatLegacyButtonModule,
    MatLegacyCardModule,
    MatLegacyListModule,
    MatLegacyTooltipModule,
    MatSidenavModule,
    MatToolbarModule,
    NgIf,
    NgFor,
    RouterModule,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    trigger('slideLeftToRight', [
      transition('* => ltr', [
        style({ transform: 'translateX(-100%)' }),
        animate('100ms ease-in', style({ transform: 'translateX(0%)' })),
      ]),
    ]),
    trigger('slideRightToLeft', [
      transition('* => rtl', [
        style({ transform: 'translateX(100%)' }),
        animate('100ms ease-in', style({ transform: 'translateX(0%)' })),
      ]),
    ]),
    trigger('cardAnimation', [
      transition(':enter', [
        style({ opacity: 0, width: 0, height: 0 }),
        animate('100ms', style({ opacity: 1, width: '*', height: '*' })),
      ]),
      transition(':leave', [
        style({ opacity: 1, width: '*', height: '*' }),
        animate('100ms', style({ opacity: 0, width: 0, height: 0 })),
      ]),
    ]),
  ],
})
export class AppComponent implements OnInit {
  categories: Record<string, Category> = categories;

  selectedCategoryIds: Array<string> = [];

  articles$!: Observable<Array<Article>>;

  previousMonth$!: Observable<Month>;

  currentMonth$!: Observable<Month>;

  nextMonth$!: Observable<Month>;

  isSmallScreen$!: Observable<boolean>;

  slideDirection!: 'ltr' | 'rtl' | undefined;

  private readonly _destroyed$: Subject<null> = new Subject<null>();

  constructor(
    private _breakpointObserver: BreakpointObserver,
    private _store: Store
  ) {}

  ngOnInit() {
    this.articles$ = combineLatest([
      this._store.articles$,
      this._store.selectedCategoryIds$,
    ]).pipe(
      map(([articles, categoryIds]) =>
        articles.filter((article) => categoryIds.includes(article.categoryId))
      ),
      takeUntil(this._destroyed$)
    );
    this.previousMonth$ = this._store.previousMonth$;
    this.currentMonth$ = this._store.currentMonth$;
    this.nextMonth$ = this._store.nextMonth$;
    this.isSmallScreen$ = this._breakpointObserver
      .observe([Breakpoints.XSmall, Breakpoints.Small])
      .pipe(
        map((result) => result.matches),
        takeUntil(this._destroyed$)
      );
    this._store.selectedCategoryIds$
      .pipe(takeUntil(this._destroyed$))
      .subscribe((categoryIds) => (this.selectedCategoryIds = categoryIds));
    this._store.selectedCategoryIds = Object.keys(this.categories);
  }

  changeSelectedCategoryIds(categoryIds: Array<string>) {
    this._store.selectedCategoryIds = categoryIds;
  }

  trackArticleByUrl(_index: number, article: Article) {
    return article.url;
  }

  ngOnDestroy() {
    this._destroyed$.next(null);
    this._destroyed$.complete();
  }
}
