import { Injectable, computed, signal } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';

import { filter, switchMap } from 'rxjs';

import { ApiClient } from './api-client.service';
import { Article } from './article';
import { categories } from './categories';
import { Category } from './category';
import { Month, compareMonths, isMonth } from './month';

@Injectable({
  providedIn: 'root',
})
export class Store {
  /** Months. */
  readonly months = signal<Array<Month>>([]);

  /** Current month. */
  readonly currentMonth = signal<Month>([]);

  /** Previous month. */
  readonly previousMonth = computed<Month>(() => {
    const index = this.months().findIndex((month) =>
      Boolean(compareMonths(month, this.currentMonth()))
    );
    return this.months()[index + 1] ?? [];
  });

  /** Next month. */
  readonly nextMonth = computed<Month>(() => {
    const index = this.months().findIndex((month) =>
      Boolean(compareMonths(month, this.currentMonth()))
    );
    return this.months()[index - 1] ?? [];
  });

  /** Categories. */
  readonly categories = signal<Record<string, Category>>(categories);

  /** Selected category IDs. */
  readonly selectedCategoryIds = signal<Array<string>>(Object.keys(categories));

  /** Articles. */
  readonly articles = toSignal<Array<Article>>(
    toObservable(this.currentMonth).pipe(
      filter(isMonth),
      switchMap((currentMonth) => this._api.getArticlesByMonth$(currentMonth))
    )
  );

  /** Filtered articles. */
  readonly filteredArticles = computed<Array<Article> | undefined>(() =>
    this.articles()?.filter((article) =>
      this.selectedCategoryIds().includes(article.categoryId)
    )
  );

  constructor(private _api: ApiClient) {}
}
