import { Component, OnInit } from '@angular/core';

import { City } from '../../city';
import { Forecast } from '../../forecast';

import { WeatherService } from '../../services/weather.service'

import { CITIES } from '../../CITIES'

@Component({
  selector: 'app-home',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  cities: City[] = CITIES;
  selectedCity: City;
  forecast: Forecast;
  errorMsg: any;

  constructor(private weatherService: WeatherService) { }

  onSelectCity(city) {
    this.selectedCity = city;
    this.selectedCity.name = city.name;
    this.selectedCity.lat = city.lat;
    this.selectedCity.lon = city.lon;
    
    this.weatherService.getWeather(this.selectedCity.lat, this.selectedCity.lon).subscribe(forecast => {
      this.forecast = forecast;
      console.log(forecast);
    }, err => this.errorMsg = <any>err);
  }

  ngOnInit() { }
}
