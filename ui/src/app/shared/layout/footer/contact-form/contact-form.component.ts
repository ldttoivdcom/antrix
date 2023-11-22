import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
  ValidationErrors, FormControl,
} from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject, takeUntil } from 'rxjs';
import { Papa } from 'ngx-papaparse';
import { CsvDataService } from 'src/app/shared/services/csv-data.service';
import { Products } from 'src/app/models/products.model';
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
export class ContactFormComponent implements OnInit, OnDestroy {
  ngUnsubscribe$ = new Subject<void>();
  captcha: string;
  Products: Products[] = [];
  Services: Products[] = [];
  contactForm: FormGroup;
  Pricings: string[] =[
    'Consulting Service - 200$',
    'Consulting Service - 0$',
    'Product Purchase - 200$'
  ]
  constructor(
    private _formBuilder: FormBuilder,
    private _http: HttpClient,
    private _papa: Papa,
    private _csvDataService: CsvDataService
  ) {
    this.captcha = '';
  }
  ngOnInit(): void {
    this.initContactForm();
    this.initCsvProductsData();
    this.initCsvServicesData();
  }

  initContactForm(): void {
    this.contactForm = this._formBuilder.group({
      name: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', [Validators.required]],
      CompanyName: ['', [Validators.required]],
      JobTitle: ['', [Validators.required]],
      Pricing: '',
      CompanyWebsite: ['', [Validators.required]],
      ProductServices: ['', [Validators.required]],
      PartNo: '',
      Message: ['', [Validators.required]],
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

  initCsvProductsData(): void {
    const csvFileUrl = '../../../../assets/csv/Antrix Product List.csv';
    this._csvDataService.getCsvData(csvFileUrl).subscribe((csvData) => {
      this._papa.parse(csvData, {
        header: true,
        complete: (result) => {
          this.Products = result.data
            .filter((row: Products) => row.PartNumber && row.Name)
            .map((row: Products) => ({
              PartNumber: row.PartNumber,
              Name: row.Name,
              imgPath: row.imgPath,
              Description: row.Description,
            }));
        },
      });
    });
  }

  initCsvServicesData(): void {
    const csvFileUrl = '../../../../assets/csv/Antrix Service List.csv';
    this._csvDataService.getCsvData(csvFileUrl).subscribe((csvData) => {
      this._papa.parse(csvData, {
        header: true,
        complete: (result) => {
          this.Services = result.data
            .filter((row: Products) => row.PartNumber && row.Name)
            .map((row: Products) => ({
              PartNumber: row.PartNumber,
              Name: row.Name,
              imgPath: row.imgPath,
              Description: row.Description,
            }));
        },
      });
    });
  }

  ngOnDestroy() {
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
  }
}
