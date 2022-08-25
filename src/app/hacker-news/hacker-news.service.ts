import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { catchError, forkJoin, map, of, switchMap, tap } from "rxjs";
import { NotificationsService } from "../notifications/notifications.service";


export type Article = {
    title: string,
    time: number,
    url: string
}


@Injectable({
    providedIn: 'root'
})
export class HackerNewsService {
    private articleIDs: number[] = []
    private url = 'https://hacker-news.firebaseio.com/v0/'

    constructor (private http: HttpClient, private notifications: NotificationsService) { }

    getArticleIDs (category: string) {
        return this.http.get<number[]>(`${this.url}${category}.json`)
            .pipe(
                tap(articleIds => {
                    this.articleIDs = articleIds
                    this.notifications.addSuccessMessage('HackerNews article IDs fetched')
                }),
                catchError((error) => {
                    this.notifications.addErrorMessage('Failed to fetch article IDs from HackerNews' + error.statusText)
                    throw new Error('Failed to load article IDs from HackerNews ')
                })
            )
    }

    getArticlesForPage (page: number, articlesPerPage: number) {
        return of(this.articleIDs)
            .pipe(
                tap(() => this.notifications.addInfoMessage('Waiting to get HackerNews page ' + page)),
                map(articleIDs => {
                    const fromArticleIndex = (page - 1) * articlesPerPage
                    const toArticleIndex = Math.min(page * articlesPerPage - 1, articleIDs.length - 1)
                    return articleIDs.slice(fromArticleIndex, toArticleIndex + 1)
                }),
                switchMap(articleIDs => forkJoin(articleIDs
                    .map(id => this.http.get<Article>(`${this.url}item/${id}.json`)))
                ),
                tap(() => this.notifications.addSuccessMessage('HackerNews page ' + page + ' loaded')),
                catchError((error) => {
                    this.notifications.addErrorMessage('Failed to fetch HackerNews page' + page + ' ERROR: ' + error.statusText)
                    throw new Error('Failed to fetch HackerNews page ' + page)
                })
            )
    }
}
