import {
  AsyncPipe,
  DatePipe,
  KeyValuePipe,
  NgIf,
  NgFor,
} from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { MatLegacyButtonModule } from '@angular/material/legacy-button';
import { MatLegacyCardModule } from '@angular/material/legacy-card';
import { MatLegacyListModule } from '@angular/material/legacy-list';
import { MatLegacyTooltipModule } from '@angular/material/legacy-tooltip';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';

import { Article } from './article';
import { Store } from './store.service';

@Component({
  standalone: true,
  selector: 'av-root',
  changeDetection: ChangeDetectionStrategy.OnPush,
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
export class AppComponent {
  categories = this._store.categories;

  selectedCategoryIds = this._store.selectedCategoryIds;

  articles = this._store.filteredArticles;

  previousMonth = this._store.previousMonth;

  currentMonth = this._store.currentMonth;

  nextMonth = this._store.nextMonth;

  isSmallScreen = this._store.isSmallScreen;

  canShare = this._store.canShare;

  constructor(private _iconRegistry: MatIconRegistry, private _store: Store) {
    this._iconRegistry.setDefaultFontSetClass('material-symbols-outlined');
  }

  changeSelectedCategoryIds(categoryIds: Array<string>) {
    this._store.selectedCategoryIds.set(categoryIds);
  }

  shareArticle(article: Article) {
    if (this.canShare) {
      navigator.share({
        title: article.title,
        text: article.quote,
        url: article.url,
      });
    }
  }

  trackArticleByUrl(_index: number, article: Article) {
    return article.url;
  }
}
