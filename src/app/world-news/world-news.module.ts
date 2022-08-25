import { NgModule } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { WorldNewsArticlesComponent } from './world-news-articles/world-news-articles.component';
import { TrimTitlePipe } from './trim-title.pipe';
import { SharedModule } from "../shared/shared.module";



@NgModule({
    declarations: [
        WorldNewsArticlesComponent,
        TrimTitlePipe
    ],
    exports: [
        WorldNewsArticlesComponent
    ],
    imports: [
       SharedModule,
        FormsModule
    ]
})
export class WorldNewsModule { }
