import {Component} from '@angular/core';
import {SharedDataService} from '../../shared/services/shared-data.service';
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
  constructor(
    private _pricingServices: SharedDataService,
    private _viewPortScroller: ViewportScroller
  ) {
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
      headerAndprice: 'Consulting Service - $200',
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
      headerAndprice: 'FREE Consultation Meeting - $0',
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
      headerAndprice: 'Product Purchase - $200',
    },
  ];

  Subscriptions: Pricings[] = [
    {
      header: 'Regulatory Intelligence Report',
      price: 249,
      text: 'Get a customized Regulatory Intelligence Report for your company product delivered  per month',
      listItems: [
        '1 monthly report',
        '1 annual report',
        'List of new predicates',
        'List of updated standards',
        "List of guidance's",
        'List of product codes and regulations',
        'List of brands',
        'List of UDI records',
        'Updated Product Regulatory Plan',
        'Save > 2 full time personnel work',
      ],
      headerAndprice: 'Regulatory Intelligence Report - $249 / month',
    },
    {
      header: 'Clinical Intelligence Report',
      price: 299,
      text: 'Get a customized Clinical Intelligence Report for your company product delivered  per month',
      listItems: [
        '1 monthly report',
        '1 annual report',
        'List of literature search report',
        'List of scientific validity report',
        'List of predicate device clinical trials',
        "List of new clinical guidance's",
        'List of product codes and regulations',
        'List of UDI records',
        'Updated Product Postmarket Clinical',
        'Follow up Report',
        'Save > 4 full time personnel work',
      ],
      headerAndprice: 'Clinical Intelligence Report - $299 / month',
    },
    {
      header: 'PMS Intelligence Report',
      price: 349,
      text: 'Get a customized PMS Intelligence Report for your company product delivered  per month',
      listItems: [
        '1 monthly report',
        '1 annual report',
        'List of predicates adverse events',
        'List of recalls & field safety actions',
        'List of warning letters',
        'List of product codes and regulations',
        'List of brands',
        'List of UDI records',
        'Updated PMS and PSUR Plan and Reports',
        'Save > 6 full time personnel work',
      ],
      headerAndprice: 'PMS Intelligence Report - $349 / month',
    },
  ];

  onClick(headerAndprice: string, id: string): void {
    this._pricingServices.updateSelectedPricing(headerAndprice);
    this._viewPortScroller.scrollToAnchor(id);
  }
}
