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
  name: string;
  sub: any;
  city: City;
  forecast: Forecast;

  constructor(private route: ActivatedRoute,
    private cityService: CityService,
    private weatherService: WeatherService) { }

  ngOnInit() {
    console.log('He');
    this.sub = this.route.params.subscribe(params => {
      this.name = params['id'];
      console.log(this.name);

      this.city = this.cityService.getCityByName(this.name);
      this.weatherService.getWeather(this.city.lat, this.city.lon)
        .subscribe(forecast => {
          this.forecast = forecast;
        }, err => this.errorMsg = <any>err);
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
