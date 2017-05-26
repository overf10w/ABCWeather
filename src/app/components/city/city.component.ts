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
      this.name = params['name'];
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

  timeConverter(UNIX_timestamp) {
    var a = new Date(UNIX_timestamp * 1000);
    var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var date = a.getDate();
    var hour = a.getHours();
    var min = a.getMinutes();
    var sec = a.getSeconds();
    var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec;
    return time;
  }
}
