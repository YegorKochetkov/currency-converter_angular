import { Component, OnDestroy, OnInit } from '@angular/core';
import { InfoToDisplayService } from '../../services/infoToDisplay.service';
import { Subscription } from 'rxjs';
import { InfoToDisplay } from 'src/types/InfoToDisplay';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  subscription: Subscription | undefined;
  info: InfoToDisplay = [0, 0, '', ''];
  amountFor: number = 0;
  amountTo: number = 0;
  from: string = '';
  to: string = '';

  constructor(private data: InfoToDisplayService) {

  }

  ngOnInit(): void {
    this.subscription = this.data.currentInfoToDisplay
      .subscribe(info => {
        this.info = info;
        this.amountFor = this.info[0];
        this.amountTo = this.info[1];
        this.from = this.info[2];
        this.to = this.info[3];
      });
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }
}
