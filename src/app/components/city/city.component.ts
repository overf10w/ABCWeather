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
  city: City;
  currentWeather: any;
  hours: any[];
  cityName: string;
  sub: any;
  errorMsg: any;

  constructor(private route: ActivatedRoute,
              private cityService: CityService,
              private weatherService: WeatherService) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.cityName = params['name'];
      // this.city = this.cityService.getCityByName(this.cityName);
      this.cityService.getCityFromGMapsByName(this.cityName)
        .subscribe(city => {
          this.city = city;
        })

      // setTimeout --> so this.city won't be undefined
      setTimeout(() => {
        this.weatherService.getWeather(this.city.lat, this.city.lon)
          .subscribe(forecast => {
            this.currentWeather = forecast.currently;
            this.hours = forecast.hourly;
          }, err => this.errorMsg = <any>err);
      }, 300);
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
