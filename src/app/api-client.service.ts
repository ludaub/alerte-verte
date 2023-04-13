import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { Article } from './article';
import { Month } from './month';

@Injectable({
  providedIn: 'root',
})
export class ApiClient {
  constructor(private _http: HttpClient) {}

  getMonths$(): Observable<Array<Month>> {
    return this._http.get<Array<Month>>('data/months.json');
  }

  getArticlesByMonth$(month: Month): Observable<Array<Article>> {
    return this._http.get<Array<Article>>(`data/${month.join('-')}.json`);
  }
}
