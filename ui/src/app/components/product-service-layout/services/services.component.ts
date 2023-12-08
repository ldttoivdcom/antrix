import {Component, OnDestroy, OnInit} from '@angular/core';
import {Products} from 'src/app/models/products.model';
import {Papa} from 'ngx-papaparse';
import {CsvDataService} from 'src/app/shared/services/csv-data.service';
import {debounceTime, distinctUntilChanged, Subject, takeUntil} from 'rxjs';


@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss'],
})


export class ServicesComponent implements OnInit, OnDestroy {
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
    const csvFileUrl = '../../../../assets/csv/Antrix Service List.csv';
    this._csvService.getCsvData(csvFileUrl).subscribe((csvData) => {
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
          this.filteredProducts = [...this.data];
        },
      });
    });
  }

  onSubmit() {
    this.searchFilter();
  }

  TrackValueChange(value: string): void {
    const searchLower = value.toLowerCase();
    this.filteredProducts = this.data.filter(
      (product: Products) =>
        product.Name.toLowerCase().includes(searchLower) ||
        product.Description.toLowerCase().includes(searchLower) ||
        product.PartNumber.toLowerCase().includes(searchLower)
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
}
