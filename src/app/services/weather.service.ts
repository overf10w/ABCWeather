import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { Forecast } from '../forecast';

@Injectable()
export class WeatherService {
  
  url: string;
  forecast: Forecast;

  constructor(private http: Http) { }

  getWeather(latitude: number, longitude: number): Observable<Forecast> {
    this.url = 'https://api.darksky.net/forecast/3bfcfdfa160eee3357357a6c3c400e6d/' +
      latitude.toString() + ',' + longitude.toString() + '?units=ca';

    return this.http.get(this.url)
      .map(this.extractData)
      .catch(this.handleError);
  }

  private extractData(res: Response): Forecast {
    // console.log(res.json());
    this.forecast = new Forecast();

    this.forecast.dailySummary = res.json().daily.summary ? res.json().daily.summary : '';
    this.forecast.hourlySummary = res.json().hourly.summary ? res.json().hourly.summary : '';
    this.forecast.currentlySummary = res.json().currently.summary ? res.json().hourly.summary : '';
    this.forecast.currentCelcius = res.json().currently.temperature ? res.json().currently.temperature : '';

    this.forecast.hourly = res.json().hourly.data ? res.json().hourly.data : '';
    console.log(typeof this.forecast.hourly);
    return this.forecast;
  }

  private handleError(error: Response | any) {
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }

}
