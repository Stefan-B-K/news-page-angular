import { Injectable } from '@angular/core';
import { catchError, map, Observable, switchMap, tap, throwError } from "rxjs";
import { OpenWeatherMap_API } from "../../../private";
import { HttpClient, HttpParams } from "@angular/common/http";
import { NotificationsService } from "../notifications/notifications.service";


type OpenWeatherResponse = {
    list: {
        dt_txt: string,
        main: { temp: number }
    }[]
}

export type Forecast = {
    dateTime: string,
    temperature: number
}


@Injectable({
    providedIn: 'root',
})
export class WeatherService {

    private url = 'https://api.openweathermap.org/data/2.5/forecast'

    constructor (private http: HttpClient, private notifications: NotificationsService) {}

    getCurrentLocation = () => {
        return new Observable<GeolocationCoordinates>((observer) => {
            window.navigator.geolocation.getCurrentPosition(
                position => {
                    observer.next(position.coords)
                    observer.complete()
                },
                err => observer.error(err)
            )
        }).pipe(
            tap(() => this.notifications.addSuccessMessage('Current location acquired')),
            catchError((error) => {
                this.notifications.addErrorMessage('Current location unknown: ' + error.message, 7)
                throw new Error('Current location unknown!')
            })
        )
    }
    // get every 8-th element from the OpenWeatherResponse list
    getForecast () {
        return this.getCurrentLocation()
            .pipe(
                map(coords => new HttpParams()
                    .set('lat', coords.latitude)
                    .set('lon', coords.longitude)
                    .set('units', 'metric')
                    .set('appid', OpenWeatherMap_API)
                ),
                tap(() => this.notifications.addInfoMessage('Waiting for OpenWeather data...')),
                switchMap(params => this.http.get<OpenWeatherResponse>(this.url, { params })),
                tap(() => this.notifications.addSuccessMessage('Weather data received')),
                catchError((error) => {
                    this.notifications.addErrorMessage('Failed to get weather data: ' + error.message, 7)
                    return throwError(error)
                }),
                map(res => res.list
                    .filter((el, index) => index % 8 === 0)
                    .map<Forecast>(el => ({
                        dateTime: el.dt_txt,
                        temperature: el.main.temp
                    }))
                )
            )
    }


}
