import { inject } from '@angular/core';
import { CanMatchFn, Route, UrlSegment, Router, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { compareMonths, isMonth } from './month';
import { Store } from './store.service';

const canMatchMonth: CanMatchFn = (
  route: Route,
  segments: Array<UrlSegment>
) => {
  const urlMonth = [segments[0].path, segments[1].path];
  const store = inject(Store);
  const isValidMonth =
    isMonth(urlMonth) &&
    store.months().some((month) => compareMonths(month, urlMonth));
  if (isValidMonth) store.currentMonth.set(urlMonth);
  console.debug(store.currentMonth());
  return isValidMonth;
};

const canMatchNoMonth: CanMatchFn = (
  route: Route,
  segments: Array<UrlSegment>
) => {
  const store = inject(Store);
  const month = store.months()[0];
  inject(Router).navigate(month);
  return true;
};

export const routes: Routes = [
  {
    path: ':year/:month',
    component: AppComponent,
    canMatch: [canMatchMonth],
  },
  {
    path: '',
    component: AppComponent,
    canMatch: [canMatchNoMonth],
  },
  {
    path: '**',
    redirectTo: '',
  },
];
