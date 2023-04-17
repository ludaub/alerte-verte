import { Injectable } from '@angular/core';

import { BehaviorSubject, combineLatest, filter, map, switchMap } from 'rxjs';

import { ApiClient } from './api-client.service';
import { categories } from './categories';
import { Category } from './category';
import { Month, compareMonths, isMonth } from './month';

@Injectable({
  providedIn: 'root',
})
export class Store {
  /** Months. */
  get months(): Array<Month> {
    return this._months.getValue();
  }

  set months(months: Array<Month>) {
    this._months.next(months);
  }

  private readonly _months = new BehaviorSubject<Array<Month>>([]);

  readonly months$ = this._months.asObservable();

  /** Current month. */
  get currentMonth(): Month {
    return this._currentMonth.getValue();
  }

  set currentMonth(month: Month) {
    this._currentMonth.next(month);
  }

  private readonly _currentMonth = new BehaviorSubject<Month>([]);

  readonly currentMonth$ = this._currentMonth.asObservable();

  /** Previous month. */
  readonly previousMonth$ = this.currentMonth$.pipe(
    filter(isMonth),
    map((currentMonth) => {
      const index = this.months.findIndex((month) =>
        Boolean(compareMonths(month, currentMonth))
      );
      return this.months[index + 1] ?? [];
    })
  );

  /** Next month. */
  readonly nextMonth$ = this.currentMonth$.pipe(
    filter(isMonth),
    map((currentMonth) => {
      const index = this.months.findIndex((month) =>
        Boolean(compareMonths(month, currentMonth))
      );
      return this.months[index - 1] ?? [];
    })
  );

  /** Categories */
  private readonly _categories = new BehaviorSubject<Record<string, Category>>(
    categories
  );

  readonly categories$ = this._categories.asObservable();

  /** Selected category IDs. */
  get selectedCategoryIds(): Array<string> {
    return this._selectedCategoryIds.getValue();
  }

  set selectedCategoryIds(categories: Array<string>) {
    this._selectedCategoryIds.next(categories);
  }

  private readonly _selectedCategoryIds = new BehaviorSubject<Array<string>>(
    Object.keys(categories)
  );

  readonly selectedCategoryIds$ = this._selectedCategoryIds.asObservable();

  /** Articles. */
  readonly articles$ = this.currentMonth$.pipe(
    filter(isMonth),
    switchMap((currentMonth) => this._api.getArticlesByMonth$(currentMonth))
  );

  /** Filtered articles. */
  readonly filteredArticles$ = combineLatest([
    this.articles$,
    this.selectedCategoryIds$,
  ]).pipe(
    map(([articles, categoryIds]) =>
      articles.filter((article) => categoryIds.includes(article.categoryId))
    )
  );

  constructor(private _api: ApiClient) {}
}
