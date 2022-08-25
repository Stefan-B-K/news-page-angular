import { Component } from '@angular/core';
import { Forecast, WeatherService } from "../weather.service";
import { Observable } from "rxjs";

@Component({
    selector: 'app-forecast',
    templateUrl: './forecast.component.html',
    styleUrls: ['./forecast.component.css']
})
export class ForecastComponent {

    weatherData$!: Observable<Forecast[]>;

    constructor (private weather: WeatherService) {
        this.weatherData$ = this.weather.getForecast()
    }
}
