import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ExchangeRates } from 'src/types/ExchangeRates';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ExchangeRatesService {
  constructor(private httpClient: HttpClient) {

  }

  getRates(base: string): Observable<ExchangeRates> {
    const baseUrl = `https://open.er-api.com/v6/latest/${base}`;

    return this.httpClient.get<ExchangeRates>(baseUrl);
  }
}
