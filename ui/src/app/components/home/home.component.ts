import {Component, OnInit} from '@angular/core';
import {ViewportScroller} from '@angular/common';
import AOS from 'aos';

interface HomeContent {
  header: string;
  description: string;
  list?: string[];
  link: string;
}

interface HomeAdvantage {
  icon: string;
  header: string;
  ammount: number;
  subText: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor(private viewportScroller: ViewportScroller) {
  }

  ngOnInit() {
    AOS.init();
    AOS.refresh();
  }

  Contents: HomeContent[] = [
    {
      header: 'OUR SERVICES',
      description:
        'Antrix expert regulatory , clinical, and quality assurance services include',
      list: [
        'Setup ISO 13485, ISO 9001, ISO 15189, ISO 27001, MDSAP, EU MDR 745/2017, EU IVDR 746/2017, CLIA, CAP, NYSDOH, ISO 22716, ISO 22000, CFR 210, CFR 211, FDA CFR Part 630 Quality Management System',
        'Product Regulatory Strategy and Submissions, Product Design, Development, Risk Analysis as per ISO 14971, Usability Studies as per ISO 62366, Software Compliance as per ISO 62304, Cybersecurity, Clinical Study, Verification and Validation',
        'Product Post Market Surveillance, Vigilance, Complaints, and Field Actions',
      ],
      link: '/info/services',
    },
    {
      header: 'OUR PRODUCTS',
      description:
        'Antrix sells mission critical products for Medical Device, IVD, LDT, SaMD, Digital Health compliance.',
      list: [
        'Quality Manual and Quality System Procedures for FDA QSR 820, ISO 13485, ISO 9001, ISO 15189, ISO 27001, MDSAP, EU MDR 745/2017, EU IVDR 746/2017, CLIA, CAP, NYSDOH, ISO 22716, ISO 22000, ISO 62366, ISO 62304, FDA CFR Part 210, FDA CFR Part 211, FDA CFR Part 630',
        'Product Regulatory Strategy and Submissions, Product Design, Development, Risk Analysis, Cybersecurity, Clinical Study, Verification and Validation',
        'Product Post Market Surveillance, Vigilance, Complaints, and Field Actions',
      ],
      link: '/info/products',
    },
    {
      header: 'OUR CLIENTS',
      description:
        'At Antrix, we have worked with a number of clients in Medical Device, IVD, LDT, SaMD Industries.',
      list: [
        'Our clients trust us for our expert regulatory affairs, clinical affairs, and quality assurance consulting services and products.',
        'We believe in delivering quality and timely services to our clients to ensure their success in the market and assist in innovation and growth. Recognize revenue faster.',
        'Our clients range from small startups to large multinational corporations. We have helped our clients achieve their goals and improve patient safety and effectiveness outcomes.',
      ],
      link: '/info/services',
    },
  ];

  Advantages: HomeAdvantage[] = [
    {
      icon: 'icon-advantage-law.svg',
      header: 'Regulatory Intelligence',
      ammount: 2.5,
      subText: '(Right Intended Use and Predicate)'
    },

    {
      icon: 'icon-advantage-hospital.svg',
      header: 'Clinical Intelligence',
      ammount: 5,
      subText: '(Optimized Clinical Study Size and Low Cost)'
    },

    {
      icon: 'icon-advantage-group.svg',
      header: 'PMS Intelligence',
      ammount: 10,
      subText: '(No Recalls and Stop Shipments)'
    },

  ];

  onClick(id: string): void {
    this.viewportScroller.scrollToAnchor(id);
  }
}
