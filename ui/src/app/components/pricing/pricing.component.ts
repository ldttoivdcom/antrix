import {Component} from '@angular/core';
import {SharedDataService} from "../../shared/services/shared-data.service";
import {ViewportScroller} from '@angular/common';

interface Pricings {
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

  constructor(private _pricingServices: SharedDataService, private _viewPortScroller: ViewportScroller) {
  }

  Pricing: Pricings[] = [
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

  Subscriptions: Pricings[] = [
    {
      header: 'Regulatory Intelligence Report',
      price: 159,
      text: 'Get a customized Regulatory Intelligence Report for your company product delivered  per month',
      listItems: [
        '1 monthly report every month',
        '1 annual report every year',
        'List of all new predicates',
        'List of all updated standards',
        'List of all guidances',
        'List of product codes and regulations',
        'List of brands',
        'List of UDI records',
        'Save 1 full time personnel work'
      ],
      headerAndprice: 'Regulatory Intelligence Report - $159/ month',
    },
    {
      header: 'Clinical Intelligence Report',
      price: 199,
      text: 'Get a customized Clinical Intelligence Report for your company product delivered  per month',
      listItems: [
        '1 monthly report every month',
        '1 annual report every year',
        'List of literature search report',
        'List of scientific validity report',
        'List of all predicate device clinical trials',
        'List of all new clinical guidances',
        'List of product codes and regulations',
        'Save 1-2 full time personnel work',
      ],
      headerAndprice: 'Clinical Intelligence Report - $199/ month',
    },
    {
      header: 'PMS Intelligence Report',
      price: 249,
      text: 'Get a customized PMS Intelligence Report for your company product delivered  per month',
      listItems: [
        '1 monthly report every month',
        '1 annual report every year',
        'List of all predicates adverse events',
        'List of all recalls & field safety actions',
        'List of warning letters',
        'List of product codes and regulations',
        'List of brands',
        'List of UDI records',
      ],
      headerAndprice: 'PMS Intelligence Report - $249 / month',
    },
  ]

  onClick(headerAndprice: string, id: string): void {
    this._pricingServices.updateSelectedPricing(headerAndprice);
    this._viewPortScroller.scrollToAnchor(id)

  }
}
