import {Component, OnDestroy, OnInit} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
  ValidationErrors,
  FormControl,
  ValidatorFn
} from '@angular/forms';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Subject, Subscription, takeUntil} from 'rxjs';
import {Papa} from 'ngx-papaparse';
import {CsvDataService} from 'src/app/shared/services/csv-data.service';
import {SharedDataService} from '../../../services/shared-data.service';
import {Products} from 'src/app/models/products.model';
import {END_POINT} from '../../../const/end-point.const';

interface ApiResponse {
  code: string;
  message: string;
}

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

function captchaValidator(control: AbstractControl): ValidationErrors | null {
  return control.value ? null : {captchaNotResolved: true};
}

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.scss'],
})
export class ContactFormComponent implements OnInit, OnDestroy {
  ngUnsubscribe$ = new Subject<void>();
  private subscription: Subscription = new Subscription();
  captcha: string;
  Products: Products[] = [];
  Services: Products[] = [];
  contactForm: FormGroup;
  isConfirmRequestPopupOpened: boolean = false;
  isHidden: boolean;
  isLoading: boolean = false;
  isSelectChange: boolean;
  isPricingSelectChange: boolean;
  Pricings: string[] = [
    'Consulting Service - $200',
    'FREE Consultation Meeting - $0',
    'Product Purchase - $200',
    'Regulatory Intelligence Report - $249 / month',
    'Clinical Intelligence Report - $299 / month',
    'PMS Intelligence Report - $349 / month',
  ];

  constructor(
    private _formBuilder: FormBuilder,
    private _http: HttpClient,
    private _papa: Papa,
    private _csvDataService: CsvDataService,
    private _sharedDataService: SharedDataService
  ) {
    this.captcha = '';
  }

  ngOnInit(): void {
    this.initContactForm();
    this.initCsvProductsData();
    this.initCsvServicesData();
    this.setPricingValue();
    this.setProdServiceValue();
    this.isHidden = true; //Init the value
    // this.subscription.add(
    //   this._sharedDataService.isHidden$.subscribe((isHidden: boolean) => {
    //     this.isHidden = isHidden;
    //   })
    // );
    this.isSelectChange = true;
  }

  handleCancel(): void {
    this.isConfirmRequestPopupOpened = false;
  }

  initContactForm(): void {
    this.contactForm = this._formBuilder.group({
      firstName: new FormControl('', [Validators.required, Validators.pattern(/^[A-Za-z ]+$/)]),
      lastName: new FormControl('', [Validators.required, Validators.pattern(/^[A-Za-z ]+$/)]),
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [
        Validators.required,
        Validators.pattern(/^[0-9\-()+\s]+$/)
      ]],
      company: ['', [Validators.required]],
      jobTitle: ['', [Validators.required]],
      pricing: '',
      companyWeb: ['', [Validators.required]],
      prodService: '',
      partNo: '',
      message: ['', [Validators.required]],
      captcha: ['', [captchaValidator]],
    }, {validators: this.requireEitherFieldValidator('pricing', 'prodService')});
  }

  onSubmit(): void {
    this.isLoading = true;
    const submitForm = this.contactForm.value;
    this._http
      .post<ApiResponse>(
        `${END_POINT.BE_URL}/api/v1/contact-us`,
        submitForm,
        httpOptions
      )
      .pipe(takeUntil(this.ngUnsubscribe$))
      .subscribe(
        (res) => {
          if (res.code === '200') {
            this.isConfirmRequestPopupOpened = true;
            this.contactForm.reset();
          } else {
            console.log('err');
          }
          this.isLoading = false;
        },
        (error) => {
          console.log(error);
          this.isLoading = false;
        }
      );
  }

  resolved(captchaResponse: string) {
    this.captcha = captchaResponse;
    this.contactForm.get('captcha')?.setValue(captchaResponse);
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

  onProductServiceChange(event: Event) {
    //Will set value of Pricing to null
    this.isPricingSelectChange = true;
    this.contactForm.get('pricing')!.setValue('');
    this.isSelectChange = false;
    this.isHidden = false;
    // Cast the event target to HTMLSelectElement to access the value property
    const selectElement = event.target as HTMLSelectElement;
    const selectedProductName = selectElement.value;

    // combine 2 array Products and Services
    let selectedProductOrService = this.Products.concat(this.Services).find(
      (item) => item.Name === selectedProductName
    );

    let partNumber = selectedProductOrService
      ? selectedProductOrService.PartNumber
      : '';

    this.contactForm.get('partNo')!.setValue(partNumber);
  }

  onPricingChange(event: Event) {
    const pricingValue = this.contactForm.get('pricing')?.value;
    this.isPricingSelectChange = false;
    this.isHidden = false;
    //Will set value of ProbService to null
    this.isSelectChange = true;
    this.contactForm.get('prodService')!.setValue('');
    if (pricingValue == 'Regulatory Intelligence Report - $249 / month') {
      this.contactForm.get('partNo')!.setValue('SUB-RAR');
    } else if (pricingValue == 'Clinical Intelligence Report - $299 / month') {
      this.contactForm.get('partNo')!.setValue('SUB-CIR');
    } else if (pricingValue == 'PMS Intelligence Report - $349 / month') {
      this.contactForm.get('partNo')!.setValue('SUB-PIR');
    } else {
      this.isHidden = true;
    }
  }


  //Will get the value when user click btn in Pricing
  setPricingValue(): void {
    this.subscription.add(
      this._sharedDataService.selectedPricing.subscribe((pricingName) => {
        this.isHidden = true;
        this.isSelectChange = true;
        this.isPricingSelectChange = false;
        this.contactForm.get('pricing')?.setValue(pricingName);
        this.contactForm.get('prodService')!.setValue(''); //Will set value of prodService to null
      })
    );
  }


  //Will get the value when user click btn in Products/Services
  setProdServiceValue(): void {
    this.subscription.add(
      this._sharedDataService.selectedProServiceName.subscribe((name) => {
        this.isSelectChange = false;
        this.isHidden = false;
        this.isPricingSelectChange = true;
        this.contactForm.get('prodService')?.setValue(name);
        this.contactForm.get('pricing')?.setValue(''); //Will set value of Pricing to null
      })
    );
    this.subscription.add(
      this._sharedDataService.selectedPartNumber.subscribe((partNumber) => {
        this.contactForm.get('partNo')?.setValue(partNumber);
      })
    );
  }

  //One or 2 field selected Validate
  requireEitherFieldValidator(field1: string, field2: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      // Cast the 'control' to FormGroup to access its individual controls
      const formGroup = control as FormGroup;
      const value1 = formGroup.get(field1)?.value;
      const value2 = formGroup.get(field2)?.value;

      if (value1 || value2) {
        return null; // One of the fields is filled, so validation passes
      } else {
        // Neither field is filled, so validation fails
        return {'requireEitherField': true};
      }
    };
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
  }
}
