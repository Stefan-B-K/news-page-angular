import { Component, Input, } from '@angular/core';
import { Observable } from "rxjs";
import { Article, HackerNewsService } from "../hacker-news.service";


@Component({
    selector: 'app-hacker-news-articles',
    templateUrl: './hacker-news-articles.component.html',
    styleUrls: ['./hacker-news-articles.component.css']
})
export class HackerNewsArticlesComponent {
    @Input() articlesPerPage!: number

    articleIDs: number[] | null = null
    totalPages = 0
    articlesForCurrentPage$ = new Observable<Article[]>()
    currentPage!: number

    storyCategories = ['topstories', 'newstories', 'beststories', 'jobstories', 'showstories']
    selectedCategory = 0
    paginatorSize = 5

    constructor (private news: HackerNewsService) {
        this.fetchArticleIDs()
    }

    fetchArticleIDs () {
        this.news.getArticleIDs(this.storyCategories[this.selectedCategory])
            .subscribe(articleIDs => {
                this.articleIDs = articleIDs
                this.totalPages =  Math.ceil(this.articleIDs?.length ?? 0 / this.articlesPerPage)
                this.setCurrentPage(1)
            })


    }

    onChangeCategory () {
        this.fetchArticleIDs()
        this.totalPages =  Math.ceil(this.articleIDs?.length ?? 0 / this.articlesPerPage)
        this.setCurrentPage(1)
    }

    setCurrentPage (page: number) {
        this.currentPage = page
        this.articlesForCurrentPage$ = this.news.getArticlesForPage(page, this.articlesPerPage)
    }

    domainFromUrl(url: string) {
        return url.slice(8) .split('/')[0]
    }
}
