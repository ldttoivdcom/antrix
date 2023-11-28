import {Component, OnInit} from '@angular/core';
import AOS from "aos";

@Component({
  selector: 'app-auto-slide-logo',
  templateUrl: './auto-slide-logo.component.html',
  styleUrls: ['./auto-slide-logo.component.scss'],
})
export class AutoSlideLogoComponent implements OnInit {
  ngOnInit() {
    AOS.init();
    AOS.refresh();
  }
}
