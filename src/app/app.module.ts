import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { MainComponent } from './components/main/main.component';
import { CityComponent } from './components/city/city.component';

import { WeatherService } from './services/weather.service';
import { CityService } from './services/city.service';

const appRoutes: Routes = [
  { path: '', redirectTo: 'weather', pathMatch: 'full' },
  {
    path: 'weather', component: MainComponent, children: [
      { path: 'city/:name', component: CityComponent }
    ]
  }
]

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    MainComponent,
    CityComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [WeatherService, CityService],
  bootstrap: [AppComponent]
})
export class AppModule { }
