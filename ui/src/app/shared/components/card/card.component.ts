import {Component, Input} from '@angular/core';
import {Products} from 'src/app/models/products.model';
import {ViewportScroller} from '@angular/common';

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
  modalsVisibility: boolean[] = new Array(this.ProductsData.length).fill(false);

  constructor(private viewportScroller: ViewportScroller) {
  }

  showModal(index: number): void {
    this.activeItemIndex = index;
  }

  handleCancel(index: number): void {
    this.modalsVisibility[index] = false;

  }

  closeModal(): void {
    this.activeItemIndex = null;
  }

  // Scroll to contact us
  onClick(id: string): void {
    this.activeItemIndex = null; //close modal
    this.viewportScroller.scrollToAnchor(id)
  }
}
