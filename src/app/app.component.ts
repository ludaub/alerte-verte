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
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { MatLegacyButtonModule } from '@angular/material/legacy-button';
import { MatLegacyCardModule } from '@angular/material/legacy-card';
import { MatLegacyListModule } from '@angular/material/legacy-list';
import { MatLegacyTooltipModule } from '@angular/material/legacy-tooltip';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';

import { Observable, map } from 'rxjs';

import { Article } from './article';
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
})
export class AppComponent implements OnInit {
  categories$!: Observable<Record<string, Category>>;

  selectedCategoryIds$!: Observable<Array<string>>;

  articles$!: Observable<Array<Article>>;

  previousMonth$!: Observable<Month>;

  currentMonth$!: Observable<Month>;

  nextMonth$!: Observable<Month>;

  isSmallScreen$!: Observable<boolean>;

  constructor(
    private _breakpointObserver: BreakpointObserver,
    private _iconRegistry: MatIconRegistry,
    private _store: Store
  ) {
    this._iconRegistry.setDefaultFontSetClass('material-symbols-outlined');
  }

  ngOnInit() {
    this.categories$ = this._store.categories$;
    this.selectedCategoryIds$ = this._store.selectedCategoryIds$;
    this.articles$ = this._store.filteredArticles$;
    this.previousMonth$ = this._store.previousMonth$;
    this.currentMonth$ = this._store.currentMonth$;
    this.nextMonth$ = this._store.nextMonth$;
    this.isSmallScreen$ = this._breakpointObserver
      .observe([Breakpoints.XSmall, Breakpoints.Small])
      .pipe(map((result) => result.matches));
  }

  changeSelectedCategoryIds(categoryIds: Array<string>) {
    this._store.selectedCategoryIds = categoryIds;
  }

  trackArticleByUrl(_index: number, article: Article) {
    return article.url;
  }
}
