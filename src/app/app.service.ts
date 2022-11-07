import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { BehaviorSubject, Observable, filter, map } from 'rxjs';

import { Article } from './article';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  readonly dates$: Observable<Array<Date>> = this._http
    .get<Array<string>>('data/dates.json')
    .pipe(map((dates) => dates.map((date) => new Date(date))));

  get currentDate(): Date | undefined {
    return this._currentDate.getValue();
  }

  set currentDate(date: Date | undefined) {
    this._currentDate.next(date);
  }

  private readonly _currentDate: BehaviorSubject<Date | undefined> =
    new BehaviorSubject<Date | undefined>(undefined);

  readonly currentDate$ = this._currentDate.asObservable();

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

  constructor(private _http: HttpClient) {
    this.dates$.subscribe((dates) => (this.currentDate = dates[0]));
    this.currentDate$
      .pipe(filter((date) => Boolean(date)))
      .subscribe((date) => {
        this._http
          .get<Array<Article>>(
            `data/${date!.toLocaleDateString('fr-FR', {
              year: 'numeric',
            })}-${date!.toLocaleDateString('fr-FR', { month: '2-digit' })}.json`
          )
          .subscribe((articles) => (this.articles = articles));
      });
  }
}
