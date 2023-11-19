import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';
import { Papa } from 'ngx-papaparse';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject, takeUntil } from 'rxjs';

interface ProductsServices {
  name: string;
  partnumber: string;
}

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

function captchaValidator(control: AbstractControl): ValidationErrors | null {
  return control.value ? null : { captchaNotResolved: true };
}
@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.scss'],
})
export class ContactFormComponent implements OnInit {
  ngUnsubscribe$ = new Subject<void>();
  captcha: string;
  ProductService: string[] = [];
  contactForm: FormGroup;
  constructor(private _formBuilder: FormBuilder, private _http: HttpClient) {
    this.captcha = '';
  }
  ngOnInit(): void {
    this.initContactForm();
  }

  initContactForm(): void {
    this.contactForm = this._formBuilder.group({
      firstName: '',
      name: '',
      email: '',
      phoneNumber: '',
      CompanyName: '',
      JobTitle: '',
      CompanyWebsite: '',
      ProductServices: '',
      PartNo: '',
      Message: '',
      captcha: ['', [captchaValidator]],
    });
  }
  onSubmit(): void {
    const submitForm = this.contactForm.value;
    this._http
      .post(
        'http://34.72.99.64:8080/api/v1/contact-us',
        submitForm,
        httpOptions
      )
      .pipe(takeUntil(this.ngUnsubscribe$))
      .subscribe((res) => {
        if (res === 200) {
          console.log(res);
        }
      });
  }
  resolved(captchaResponse: string) {
    this.captcha = captchaResponse;
    this.contactForm.get('captcha')?.setValue(captchaResponse);
    console.log(`Resolved captcha with response: ` + this.captcha);
  }

  errored() {
    console.warn(`reCAPTCHA error encountered`);
  }

  ngOnDestroy() {
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
  }
}
