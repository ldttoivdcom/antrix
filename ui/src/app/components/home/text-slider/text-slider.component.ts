import {
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  AfterViewInit,
} from '@angular/core';

@Component({
  selector: 'app-text-slider',
  templateUrl: './text-slider.component.html',
  styleUrls: ['./text-slider.component.scss'],
})
export class TextSliderComponent implements AfterViewInit {
  @ViewChild('swiper') swiperContainer!: ElementRef;
  swiperParams = {
    slidesPerView: 1,
    speed: 500,
    navigation: true,
    pagination: true,
    on: {
      init: () => {},
      slideChange: () => {},
      activeIndexChange: () => {},
    },
  };

  ngAfterViewInit(): void {
    Object.assign(this.swiperContainer.nativeElement, this.swiperParams);
    this.swiperContainer.nativeElement.initialize();
  }
}
