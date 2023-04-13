import { Injectable } from '@angular/core';

import { BehaviorSubject, Observable, filter } from 'rxjs';

import { ApiClient } from './api-client.service';
import { Article } from './article';
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

  private readonly _months: BehaviorSubject<Array<Month>> = new BehaviorSubject<
    Array<Month>
  >([]);

  readonly months$: Observable<Array<Month>> = this._months.asObservable();

  /** Current month. */
  get currentMonth(): Month {
    return this._currentMonth.getValue();
  }

  set currentMonth(month: Month) {
    this._currentMonth.next(month);
  }

  private readonly _currentMonth: BehaviorSubject<Month> =
    new BehaviorSubject<Month>([]);

  readonly currentMonth$ = this._currentMonth.asObservable();

  /** Previous month. */
  get previousMonth(): Month {
    return this._previousMonth.getValue();
  }

  set previousMonth(month: Month) {
    this._previousMonth.next(month);
  }

  private readonly _previousMonth: BehaviorSubject<Month> =
    new BehaviorSubject<Month>([]);

  readonly previousMonth$ = this._previousMonth.asObservable();

  /** Next month. */
  get nextMonth(): Month {
    return this._nextMonth.getValue();
  }

  set nextMonth(month: Month) {
    this._nextMonth.next(month);
  }

  private readonly _nextMonth: BehaviorSubject<Month> =
    new BehaviorSubject<Month>([]);

  readonly nextMonth$ = this._nextMonth.asObservable();

  /** Articles. */
  get articles(): Array<Article> {
    return this._articles.getValue();
  }

  set articles(articles: Array<Article>) {
    this._articles.next(articles);
  }

  private readonly _articles: BehaviorSubject<Array<Article>> =
    new BehaviorSubject<Array<Article>>([]);

  readonly articles$: Observable<Array<Article>> =
    this._articles.asObservable();

  /** Selected category IDs. */
  get selectedCategoryIds(): Array<string> {
    return this._selectedCategoryIds.getValue();
  }

  set selectedCategoryIds(categories: Array<string>) {
    this._selectedCategoryIds.next(categories);
  }

  private readonly _selectedCategoryIds: BehaviorSubject<Array<string>> =
    new BehaviorSubject<Array<string>>([]);

  readonly selectedCategoryIds$: Observable<Array<string>> =
    this._selectedCategoryIds.asObservable();

  constructor(private _api: ApiClient) {
    this.currentMonth$.pipe(filter(isMonth)).subscribe((currentMonth) => {
      const index = this.months.findIndex((month) =>
        Boolean(compareMonths(month, currentMonth))
      );
      this.previousMonth = this.months[index + 1] ?? undefined;
      this.nextMonth = this.months[index - 1] ?? undefined;
    });
    this.currentMonth$.pipe(filter(isMonth)).subscribe((currentMonth) => {
      this._api
        .getArticlesByMonth$(currentMonth)
        .subscribe((articles) => (this.articles = articles));
    });
  }
}
