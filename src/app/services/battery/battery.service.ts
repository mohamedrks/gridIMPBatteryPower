import { Injectable } from '@angular/core';

import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Battery } from 'src/app/models/battery';
import { Time } from 'src/app/models/time';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

// API URL retrieved from here.

@Injectable({
  providedIn: 'root',
})
export class BatteryService {

  private _jsonURL = 'assets/battery_data.json';

  constructor(private http: HttpClient) {}

  getBatteryData(): Observable<any[]> {
    return this.http.get<any[]>(this._jsonURL);
  }


  getCurrentPeriod(): Time {
    
    const currentTime = new Date();
    const hour = currentTime.getHours();
    const minute = currentTime.getMinutes();

    return { Hour: hour, Minute: minute};
  }
}
