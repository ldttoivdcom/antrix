import {Component} from '@angular/core';
import {PricingDataService} from "../../shared/services/pricing-data.service";
import {ViewportScroller} from '@angular/common';

interface PrcingServices {
  header: string;
  price: number;
  text: string;
  listItems: string[];
  headerAndprice: string;
}

@Component({
  selector: 'app-pricing',
  templateUrl: './pricing.component.html',
  styleUrls: ['./pricing.component.scss'],
})
export class PricingComponent {

  constructor(private _pricingServices: PricingDataService, private _viewPortScroller: ViewportScroller) {
  }

  Pricing: PrcingServices[] = [
    {
      header: 'Consulting Service',
      price: 200,
      text: 'Get a customized company specific consulting service quote',
      listItems: [
        '1 Goal setting consultation for an hour',
        '2 Follow up statement of work sessions',
        'Online resources',
        'Phone support',
        'Priority support',
      ],
      headerAndprice: 'Consulting Service - 200$',
    },
    {
      header: 'FREE Consultation Meeting',
      price: 0,
      text: 'Add value and maximize your competitive advantage',
      listItems: [
        '1 FREE Goal setting meeting for half hour',
        '1 FREE Goal setting through email or chat for half an hour',
        '2 Statement of work sessions',
        'Online resources',
      ],
      headerAndprice: 'FREE Consultation Meeting - 0$',
    },
    {
      header: 'Product Purchase',
      price: 200,
      text: 'Get a customized company specific product purchase quote',
      listItems: [
        '1 Goal setting consultation for an hour',
        '2 Product specification and requirements meeting',
        'Online resources',
        'Phone support',
        'Priority support',
      ],
      headerAndprice: 'Product Purchase - 200$',
    },
  ];

  onClick(headerAndprice: string, id: string): void {
    this._pricingServices.updateSelectedPricing(headerAndprice);
    this._viewPortScroller.scrollToAnchor(id)

  }
}
