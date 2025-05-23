import {Component} from '@angular/core';
import {ViewportScroller} from '@angular/common';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  constructor(private viewportScroller: ViewportScroller) {
  }

  onClick(id: string) {
    this.viewportScroller.scrollToAnchor(id)
  }
}
