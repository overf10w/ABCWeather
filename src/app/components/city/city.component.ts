import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-city',
  templateUrl: './city.component.html',
  styleUrls: ['./city.component.css']
})
export class CityComponent implements OnInit {
  name: string;
  lat: number;
  lon: number;
  
  constructor() {
    this.name = 'Kiev';
    this.lat = 50.450100
    this.lon = 30.523400
  }

  ngOnInit() {
  }

}
