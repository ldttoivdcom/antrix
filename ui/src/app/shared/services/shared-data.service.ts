import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SharedDataService {
  private selectedProServiceNameSource = new BehaviorSubject<string>(''); // to save the selected pro service name
  selectedProServiceName = this.selectedProServiceNameSource.asObservable();

  private selectedPartNumberSource = new BehaviorSubject<string>(''); // to save the selected part number
  selectedPartNumber = this.selectedPartNumberSource.asObservable();

  constructor() {
  }

  updateSelectedProServices(proService: {
    name: string;
    partNumber: string;
  }): void {
    this.selectedProServiceNameSource.next(proService.name);
    this.selectedPartNumberSource.next(proService.partNumber);
  }
}
