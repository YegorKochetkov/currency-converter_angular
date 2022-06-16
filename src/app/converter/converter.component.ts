import { Component, OnDestroy, OnInit } from '@angular/core';
import { InfoToDisplayService } from '../../services/infoToDisplay.service';
import { ExchangeRatesService } from '../../services/rates.service';
import { Subscription } from 'rxjs';
import { InfoToDisplay } from 'src/types/InfoToDisplay';

@Component({
  selector: 'app-converter',
  templateUrl: './converter.component.html',
  styleUrls: ['./converter.component.scss'],
})
export class ConverterComponent implements OnInit, OnDestroy {
  amountFrom = 0;
  amountTo = 0;

  from = 'UAH';
  to = 'USD';

  rates: { [key: string]: number; } | undefined;
  allCurrencies: string[] | undefined;

  message = 'Loading...';

  info: InfoToDisplay = [this.amountFrom, this.amountTo, this.from, this.to];
  subscription = new Subscription;

  constructor(
    private infoService: InfoToDisplayService,
    private ratesService: ExchangeRatesService,
  ) {
    this.infoService.changeInfoToDisplay(this.info);
  }

  loadRates() {
    this.ratesService.getRates(this.from)
    .subscribe(
      (response) => {
          this.message = '';
          this.rates = response.rates;
          this.allCurrencies = Object.keys(response.rates)
            .filter((currency) => currency === "USD"
                              || currency === "EUR"
                              || currency === "UAH"
                              || currency === "GBP"
            );
          this.convertFrom();
      }
    );
  }

  swap() {
    this.message = 'Loading...';
    [this.from, this.to] = [this.to, this.from];
    this.loadRates();
    this.convertFrom();
  }

  ngOnInit(): void {
    this.loadRates();
    this.subscription = this.infoService.currentInfoToDisplay
      .subscribe(info => this.info = info);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  convertTo(): void {
    if (this.rates) {
      const resultTo = this.amountTo / this.rates[this.to];

      this.amountFrom = +resultTo.toFixed(2);
      this.infoService.changeInfoToDisplay(
        [this.amountFrom, this.amountTo, this.from, this.to]
      );
    }
  }

  convertFrom(): void {
    if (this.rates) {
      const resultTo = this.amountFrom * this.rates[this.to];

      this.amountTo = +resultTo.toFixed(2);
      this.infoService.changeInfoToDisplay(
        [this.amountFrom, this.amountTo, this.from, this.to]
      );
    }
  }
}
