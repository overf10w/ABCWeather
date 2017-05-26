import { ActivatedRoute } from '@angular/router';
import { Component, Input, OnInit, OnDestroy } from '@angular/core';

import { City } from '../../city';
import { Forecast } from '../../forecast';

import { WeatherService } from '../../services/weather.service'
import { CityService } from '../../services/city.service'

@Component({
  selector: 'app-city',
  templateUrl: './city.component.html',
  styleUrls: ['./city.component.css']
})
export class CityComponent {
  errorMsg: any;
  cityName: string;
  sub: any;
  city: City;
  forecast: Forecast;
  hours: any[];

  constructor(private route: ActivatedRoute,
    private cityService: CityService,
    private weatherService: WeatherService) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.cityName = params['name'];
      this.city = this.cityService.getCityByName(this.cityName);

      this.weatherService.getWeather(this.city.lat, this.city.lon)
        .subscribe(forecast => {
          this.forecast = forecast;
          this.hours = this.makeHours(this.forecast.hourly);
        }, err => this.errorMsg = <any>err);
    });
  }

  // Make an hours array
  makeHours(hourly) {
    let hours = new Array;
    for (let i = 0; i < hourly.length; i++) {
      let hour = hourly[i];
      hour.time *= 1000;
      hour.windBearing = this.degToCompass(hour.windBearing);
      hours.push(hour);
    }
    return hours;
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  getHexColor(num) {
    return num.toString(16);
  }

  degToCompass(num) {
    let val = Math.floor((num / 22.5) + 0.5);
    let arr = [
      "North",
      "North-Northeast",
      "Northeast",
      "East-Northeast",
      "East",
      "East-Southeast",
      "Southeast",
      "South-Southeast",
      "South",
      "South-Southwest",
      "Southwest",
      "West-Southwest",
      "West",
      "West-Northwest",
      "Northwest",
      "North-Northwest"
    ];
    return arr[(val % 16)];
  }
}
