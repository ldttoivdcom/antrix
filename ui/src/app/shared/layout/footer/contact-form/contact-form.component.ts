import {Component, OnDestroy, OnInit} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
  ValidationErrors,
  FormControl,
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
  Pricings: string[] = [
    'Consulting Service - 200$',
    'FREE Consultation Meeting - 0$',
    'Product Purchase - 200$',
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
    this.subscription.add(
      this._sharedDataService.isHidden$.subscribe((isHidden: boolean) => {
        this.isHidden = isHidden;
      })
    )
  }

  handleCancel(): void {
    this.isConfirmRequestPopupOpened = false;
  }

  initContactForm(): void {
    this.contactForm = this._formBuilder.group({
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required]],
      company: ['', [Validators.required]],
      jobTitle: ['', [Validators.required]],
      Pricing: '',
      companyWeb: ['', [Validators.required]],
      prodService: ['', [Validators.required]],
      partNo: '',
      message: ['', [Validators.required]],
      captcha: ['', [captchaValidator]],
    });
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
      .subscribe((res) => {
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

  onProductServiceChange(event: Event) {
    // Cast the event target to HTMLSelectElement to access the value property
    const selectElement = event.target as HTMLSelectElement;
    const selectedProductName = selectElement.value;

    //check if has pricing will hide Part number
    if (this.Pricings.includes(selectedProductName)) {
      this.isHidden = true;
    } else {
      this.isHidden = false;
      // combine 2 array Products and Services
      let selectedProductOrService = this.Products.concat(this.Services).find(
        (item) => item.Name === selectedProductName
      );

      let partNumber = selectedProductOrService
        ? selectedProductOrService.PartNumber
        : '';

      this.contactForm.get('partNo')!.setValue(partNumber);
    }
  }

  setPricingValue(): void {
    this.subscription.add(
      this._sharedDataService.selectedPricing.subscribe((pricingName) => {
        this.isHidden = true;
        this.contactForm.get('prodService')?.setValue(pricingName);
      })
    );
  }

  setProdServiceValue(): void {
    this.subscription.add(
      this._sharedDataService.selectedProServiceName.subscribe((name) => {
        this.contactForm.get('prodService')?.setValue(name);
      })
    );
    this.subscription.add(
      this._sharedDataService.selectedPartNumber.subscribe((partNumber) => {
        this.contactForm.get('partNo')?.setValue(partNumber);
      })
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete()
  }

}
