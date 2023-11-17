import { Component, Input } from '@angular/core';
import { Products } from 'src/app/models/products.model';
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
  showModal(index: number): void {
    this.activeItemIndex = index;
  }

  closeModal(): void {
    console.log('closeModal');
    this.activeItemIndex = null;
  }
}
