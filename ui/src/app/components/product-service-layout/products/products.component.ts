import {Component, OnDestroy, OnInit} from '@angular/core';
import {Products} from 'src/app/models/products.model';
import {Papa} from 'ngx-papaparse';
import {CsvDataService} from 'src/app/shared/services/csv-data.service';
import {Subject, debounceTime, distinctUntilChanged, takeUntil, take} from 'rxjs';
import {FormControl} from '@angular/forms';
import {query} from "@angular/animations";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit, OnDestroy {
  data: Products[] = [];
  filteredProducts: Products[] = [];
  searchQuery: string = '';
  searchSubject = new Subject<string>();
  unsubscription$: Subject<void> = new Subject<void>();

  constructor(private _csvService: CsvDataService, private _papa: Papa) {
  }

  ngOnInit(): void {
    this.initCsvData();
    this.searchSubject.pipe(
      debounceTime(500),
      distinctUntilChanged(), //only search when value is different from last
      takeUntil(this.unsubscription$)
    ).subscribe((value) => {
        this.TrackValueChange(value);
      }
    )
  }

  initCsvData(): void {
    const csvFileUrl = '../../../../assets/csv/Antrix Product List.csv';
    this._csvService
      .getCsvData(csvFileUrl)
      .pipe(takeUntil(this.unsubscription$))
      .subscribe((csvData) => {
        this._papa.parse(csvData, {
          header: true,
          complete: (result) => {
            this.data = result.data
              .filter((row: Products) => row.PartNumber && row.Name)
              .map((row: Products) => ({
                PartNumber: row.PartNumber,
                Name: row.Name,
                imgPath: row.imgPath,
                Description: row.Description,
                Header: row.Header,
                List: row.List.split(';'),
                Footer: row.Footer
              }));
            console.log(this.data);
            this.filteredProducts = [...this.data];
          },
        });
      });
  }

  onSubmit() {
    this.searchFilter();
  }

  TrackValueChange(value: string): void {
    this.filteredProducts = this.data.filter(
      (product: Products) =>
        product.Name.includes(value) ||
        product.Description.includes(value) ||
        product.PartNumber.includes(value)
    );
  }

  searchFilter() {
    const searchLower = this.searchQuery.toLowerCase();
    this.filteredProducts = this.data.filter(
      (product: Products) =>
        product.Name.toLowerCase().includes(searchLower) ||
        product.Description.toLowerCase().includes(searchLower) ||
        product.PartNumber.toLowerCase().includes(searchLower)
    );
  }

  ngOnDestroy() {
    this.unsubscription$.next();
    this.unsubscription$.complete();
  }

  protected readonly query = query;
}
