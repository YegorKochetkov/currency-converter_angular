import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { InfoToDisplay } from 'src/types/InfoToDisplay';

@Injectable({
  providedIn: 'root',
})
export class InfoToDisplayService {

  private infoToDisplaySource = new Subject<InfoToDisplay>();
  currentInfoToDisplay = this.infoToDisplaySource.asObservable();

  constructor() {

  }

  changeInfoToDisplay(info: InfoToDisplay) {
    this.infoToDisplaySource.next(info);
  }
}
