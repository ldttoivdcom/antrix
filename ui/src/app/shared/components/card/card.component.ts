import {Component, Input} from '@angular/core';
import {Products} from 'src/app/models/products.model';
import {ViewportScroller} from '@angular/common';
import {PricingDataService} from '../../services/pricing-data.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent {
  activeItemIndex: number | null = null;
  @Input() ProductsData: Products[] = [];
  @Input() FirstBtnText: string = '';
  @Input() SubText: string = '';

  constructor(
    private viewportScroller: ViewportScroller,
    private _pricingServices: PricingDataService
  ) {
  }

  showModal(index: number): void {
    this.activeItemIndex = index;
  }

  closeModal(): void {
    this.activeItemIndex = null;
  }

  // Scroll to contact us
  onClick(id: string, name: string, partNumber: string): void {
    this.activeItemIndex = null; //close modal
    this._pricingServices.updateSelectedProServices({name, partNumber});
    this.viewportScroller.scrollToAnchor(id);
  }
}
