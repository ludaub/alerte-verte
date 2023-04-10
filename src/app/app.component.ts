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

import { Observable, Subject, combineLatest, map, takeUntil } from 'rxjs';

import { AppService } from './app.service';
import { Article } from './article';
import { categories } from './categories';
import { Category } from './category';

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
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
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

  articles$!: Observable<Array<Article>>;

  selectedCategoryIds: Array<string> = [];

  isSmallScreen$!: Observable<boolean>;

  private readonly _destroyed$: Subject<null> = new Subject<null>();

  constructor(
    private _breakpointObserver: BreakpointObserver,
    private _service: AppService
  ) {}

  ngOnInit() {
    this.articles$ = combineLatest([
      this._service.articles$,
      this._service.selectedCategoryIds$,
    ]).pipe(
      map(([articles, categoryIds]) =>
        articles.filter((article) => categoryIds.includes(article.categoryId))
      ),
      takeUntil(this._destroyed$)
    );
    this.isSmallScreen$ = this._breakpointObserver
      .observe([Breakpoints.XSmall, Breakpoints.Small])
      .pipe(
        map((result) => result.matches),
        takeUntil(this._destroyed$)
      );
    this._service.selectedCategoryIds$
      .pipe(takeUntil(this._destroyed$))
      .subscribe((categoryIds) => (this.selectedCategoryIds = categoryIds));
    this._service.selectedCategoryIds = Object.keys(this.categories);
  }

  ngOnDestroy() {
    this._destroyed$.next(null);
    this._destroyed$.complete();
  }

  changeSelectedCategoryIds(categoryIds: Array<string>) {
    this._service.selectedCategoryIds = categoryIds;
  }

  trackArticleByUrl(_index: number, article: Article) {
    return article.url;
  }
}
