import { Component, OnInit } from '@angular/core';

import { City } from '../../city';

@Component({
  selector: 'app-city',
  templateUrl: './city.component.html',
  styleUrls: ['./city.component.css']
})
export class CityComponent implements OnInit {
  city: City; 

  constructor() {
    this.city = new City();
    this.city.name = 'Kiev';
    this.city.lat = 50.450100
    this.city.lon = 30.523400
  }

  ngOnInit() {
  }

}
