import { NgModule } from '@angular/core';
import { HackerNewsArticlesComponent } from './hacker-news-articles/hacker-news-articles.component';
import { SharedModule } from "../shared/shared.module";
import { FormsModule } from "@angular/forms";
import { TimestampToDatePipe } from './timestamp-to-date.pipe';



@NgModule({
    declarations: [
        HackerNewsArticlesComponent,
        TimestampToDatePipe
    ],
    exports: [
        HackerNewsArticlesComponent
    ],
    imports: [
        SharedModule,
        FormsModule
    ]
})
export class HackerNewsModule { }
