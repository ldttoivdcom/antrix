import {Component, OnInit} from '@angular/core';
import {ViewportScroller} from '@angular/common';
import AOS from 'aos';

interface HomeContent {
  header: string;
  description: string;
  list: string[];
  link: string;
  imgPath: string;
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
        'Antrix offers expert regulatory, clinical, and quality assurance services which includes',
      list: [
        'Setup a Quality Management System and Procedures for ISO 13485, ISO 9001, ISO 15189, ISO 27001, MDSAP, EU MDR 2017/745, EU IVDR 2017/746, CLIA, CAP, NYSDOH, ISO 22716, ISO 22000, NSF-2, NSF-3, FDA CFR Part 210, 211, 600',
        'Develop a comprehensive product regulatory strategy and submissions plan, ensuring compliance with EU, FDA, ROW and ISO 14971 risk analysis, ISO 62366 usability studies, ISO 62304 software compliance, Analytical and Clinical Study',
        'Develop Product Post Market Surveillance, Vigilance, Complaints, and Field Actions Process and Procedures',
      ],
      link: '/info/services',
      imgPath: 'our_services.JPG'
    },
    {
      header: 'OUR PRODUCTS',
      description:
        'Antrix sells ready to implement QMS product solutions which includes',
      list: [
        'Quality Manual, Procedures, Work Instructions, and Forms for ISO 13485, ISO 9001, ISO 15189, ISO 27001, MDSAP, EU MDR 2017/745, EU IVDR 2017/746, CLIA, CAP, NYSDOH, ISO 22716, ISO 22000, NSF-2, NSF-3, FDA CFR Part 210, 211, 600',
        'Procedures, Forms and Process for Regulatory Strategy and Submissions, ensuring compliance with EU, FDA, ROW, ISO 14971 risk analysis, ISO 62366 usability studies, ISO 62304 software compliance,, Analytical and Clinical Study',
        'Procedures, Forms and Process for Post Market Surveillance, Vigilance, Complaints, and Field Actions',
      ],
      link: '/info/products',
      imgPath: 'our_products.jpg'

    },
    {
      header: 'OUR CLIENTS',
      description:
        'At Antrix, we have worked with a number of clients in Medical Device, IVD, LDT, SaMD, and digital health Industries',
      list: [
        'Our clients trust us for our expert regulatory, clinical, and quality assurance consulting services and products.',
        'We believe in delivering high quality and timely services to our clients to ensure their success in the market and assist in innovation and growth. Purchase of product solutions enables accelerated implementation allowing faster revenue recognition.',
        'Our clients range from small startups to large multinational corporations. We have helped our clients achieve their goals and improve patient safety and effectiveness outcomes.',
      ],
      link: '',
      imgPath: 'our_clients.JPG'
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
}
