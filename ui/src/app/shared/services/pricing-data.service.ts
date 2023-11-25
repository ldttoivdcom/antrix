import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PricingDataService {
  private selectedPricingSource = new BehaviorSubject<string>('') //will save last value and emits for subscribers
  selectedPricing = this.selectedPricingSource.asObservable() // the subscribers only read data, cants use next() or error()


  constructor() {
  }

  updateSelectedPricing(price: string) {
    this.selectedPricingSource.next(price); //will store the price here
  }
}
