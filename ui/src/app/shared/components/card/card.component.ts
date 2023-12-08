import {Component, Input} from '@angular/core';
import {Products} from 'src/app/models/products.model';
import {ViewportScroller} from '@angular/common';
import {SharedDataService} from '../../services/shared-data.service';

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
    private _pricingServices: SharedDataService
  ) {
  }

  showModal(index: number): void {
    this.activeItemIndex = index;
  }

  closeModal(): void {
    this.activeItemIndex = null;
  }

  // Scroll to contact us, pass value to contact-form
  onClick(id: string, name: string, partNumber: string): void {
    this.activeItemIndex = null; //close modal
    this._pricingServices.updateSelectedProServices({name, partNumber});
    this.viewportScroller.scrollToAnchor(id);
  }
}
