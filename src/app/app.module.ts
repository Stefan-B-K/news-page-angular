import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { WeatherModule } from "./weather/weather.module";
import { NotificationsModule } from "./notifications/notifications.module";
import { WorldNewsModule } from "./world-news/world-news.module";
import { HackerNewsModule } from "./hacker-news/hacker-news.module";


@NgModule({
  declarations: [
    AppComponent
  ],
    imports: [
        BrowserModule,
        WeatherModule,
        NotificationsModule,
        WorldNewsModule,
        HackerNewsModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
