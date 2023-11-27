import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SharedDataService {
  private selectedPricingSource = new BehaviorSubject<string>(''); //will save last value and emits for subscribers
  selectedPricing = this.selectedPricingSource.asObservable(); // the subscribers only read data, cant use next() or error()
  private selectedProServiceNameSource = new BehaviorSubject<string>(''); // to save the selected pro service name
  selectedProServiceName = this.selectedProServiceNameSource.asObservable();

  private selectedPartNumberSource = new BehaviorSubject<string>(''); // to save the selected part number
  selectedPartNumber = this.selectedPartNumberSource.asObservable();

  private isHiddenSource = new BehaviorSubject<boolean>(true);
  isHidden$ = this.isHiddenSource.asObservable();

  constructor() {
  }

  updateSelectedPricing(price: string) {
    this.selectedPricingSource.next(price); //will store the price here
  }

  updateSelectedProServices(proService: {
    name: string;
    partNumber: string;
    isHidden: boolean
  }): void {
    this.selectedProServiceNameSource.next(proService.name);
    this.selectedPartNumberSource.next(proService.partNumber);
    this.isHiddenSource.next(proService.isHidden)
  }
}
