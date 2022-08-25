import { Component, Input, OnInit } from '@angular/core';
import { Article, WorldNewsService } from "../world-news.service";
import { Observable } from "rxjs";
import { countryCodes } from "../country-codes";

@Component({
    selector: 'app-world-news-articles',
    templateUrl: './world-news-articles.component.html',
    styleUrls: ['./world-news-articles.component.css']
})
export class WorldNewsArticlesComponent implements OnInit {
    @Input() articlesPerPage!: number
    articles$!: Observable<Article[]>
    totalPages$!: Observable<number>

    countries = countryCodes
    selectedCountry = 'bg'
    paginatorSize = 5

    constructor (private news: WorldNewsService) {}

    ngOnInit(): void {
        this.totalPages$ = this.news.numberOfPages$
        this.articles$ = this.news.getPages(this.selectedCountry, this.articlesPerPage)
        this.news.getPage(1)
    }

    onChangeCountry() {
        this.articles$ = this.news.getPages(this.selectedCountry, this.articlesPerPage)
    }

    setCurrentPage = (page: number) => this.news.getPage(page)

}
