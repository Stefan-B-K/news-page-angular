import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from "@angular/common/http";
import { BehaviorSubject, catchError, map, switchMap, tap } from "rxjs";
import { NewsApiOrg_API } from "../../../private";
import { NotificationsService } from "../notifications/notifications.service";


export type Article = {
    title: string,
    url: string,
    author: string,
    publishedAt: string
}

type NewsApiResponse = {
    totalResults: number
    articles: Article[]
}


@Injectable({
    providedIn: 'root'
})
export class WorldNewsService {
    private NewsAPIUrl = 'https://newsapi.org/v2/top-headlines'

    private pages = new BehaviorSubject<number>(1)
    numberOfPages = new BehaviorSubject<number>(0)
    numberOfPages$ = this.numberOfPages.asObservable()

    constructor (private http: HttpClient, private notifications: NotificationsService) { }

    getPages (countryCode: string, articlesPerPage: number) {
        return this.pages.pipe(
            tap(pageNumber => {
                this.notifications.addInfoMessage('Waiting to get News API page ' + pageNumber)
            }),
            map(pageNumber => (new HttpParams()
                    .set('apiKey', NewsApiOrg_API)
                    .set('country', countryCode)
                    .set('pageSize', articlesPerPage)
                    .set('page', pageNumber)
            )),
            switchMap(params => this.http.get<NewsApiResponse>(this.NewsAPIUrl, { params })),
            tap(response => {
                this.notifications.addSuccessMessage('News API articles loaded')
                const totalPages = Math.ceil(response.totalResults / articlesPerPage)
                this.numberOfPages.next(totalPages)
            }),
            catchError((error) => {
                this.notifications.addErrorMessage('Failed to load articles from NewsAPI' + error.statusText)
                throw new Error('Failed to load articles from NewsAPI ')
            }),
            map(response => response.articles)
        )
    }

    getPage = (page: number) => this.pages.next(page)

}
