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

  cityNameQuery: string;

  constructor(private weatherService: WeatherService) { }

  ngOnInit() { }
}
