import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Papa } from 'ngx-papaparse';
interface ProductsServices {
  name: string;
  partnumber: string;
}
@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.scss'],
})
export class ContactFormComponent implements OnInit {
  captcha: string;
  ProductService: string[] = [];
  contactForm: FormGroup;
  constructor(private _formBuilder: FormBuilder) {
    this.captcha = '';
  }
  ngOnInit(): void {
    this.contactForm = this._formBuilder.group({
      name: '',
      email: '',
    });
  }

  onSubmit(): void {
    console.log(this.contactForm);
  }
  resolved(captchaResponse: string) {
    this.captcha = captchaResponse;
    console.log(`Resolved captcha with response: ` + this.captcha);
  }

  errored() {
    console.warn(`reCAPTCHA error encountered`);
  }
}
