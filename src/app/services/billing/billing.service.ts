import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class BillingPeriodService {

  private _jsonURL = 'assets/billing_periods.json';

  constructor(private http: HttpClient) {}

  getBillingPeriodData(): Observable<any[]> {
    return this.http.get<any[]>(this._jsonURL);
  }

}
