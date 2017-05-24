import { Component, OnInit } from '@angular/core';

import { City } from '../../city';
import { Forecast } from '../../forecast';

import { WeatherService } from '../../services/weather.service'

@Component({
  selector: 'app-city',
  templateUrl: './city.component.html',
  styleUrls: ['./city.component.css']
})
export class CityComponent implements OnInit {
  city: City;
  forecast: Forecast;
  errorMsg: any;

  constructor(private weatherService: WeatherService) {
    this.city = new City();
    this.city.name = 'Kiev';
    this.city.lat = 50.450100
    this.city.lon = 30.523400
  }

  ngOnInit() {
    this.weatherService.getWeather(this.city.lat, this.city.lon).subscribe(forecast => {
      this.forecast = forecast;
      console.log(forecast);
    }, err => this.errorMsg = <any>err);
  }
  
}
