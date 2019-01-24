import { FlexLayoutModule } from '@angular/flex-layout';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatCardModule, MatSlideToggleModule, MatToolbarModule, MatButtonModule, MatSidenavModule, MatIconModule, MatListModule } from '@angular/material';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    LayoutModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatListModule,
    MatSidenavModule,
    MatSlideToggleModule,
    MatToolbarModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
