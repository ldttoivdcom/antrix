import { Component } from '@angular/core';

interface PrcingServices {
  header: string;
  price: number;
  text: string;
  listItems: string[];
}
@Component({
  selector: 'app-pricing',
  templateUrl: './pricing.component.html',
  styleUrls: ['./pricing.component.scss'],
})
export class PricingComponent {
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
    },
    {
      header: 'FREE Consultation Meeting',
      price: 0,
      text: 'Add value and maximize your competitive advantage',
      listItems: [
        '1 FREE Goal setting meeting for half hour',
        '2 Product specification and requirements meeting',
        'Online resources',
        'Phone support',
        'Priority support',
      ],
    },
    {
      header: 'Product Purchase',
      price: 200,
      text: 'Get a customized company specific consulting service quote',
      listItems: [
        '1 Goal setting consultation for an hour',
        '2 Follow up statement of work sessions',
        'Online resources',
        'Phone support',
        'Priority support',
      ],
    },
  ];
}
