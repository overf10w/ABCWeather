import { Injectable } from '@angular/core';
import { City } from '../city';
import { CITIES } from '../CITIES';

@Injectable()
export class CityService {
  cities: City[] = CITIES;

  constructor() { }

  getCityByName(name) {
    for (var i = 0; i < this.cities.length; i++) {
      if (this.cities[i].name == name) {
        return this.cities[i];
      }
    }
  }

}
