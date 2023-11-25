import {Component, OnDestroy, OnInit} from '@angular/core';
import {Products} from 'src/app/models/products.model';
import {Papa} from 'ngx-papaparse';
import {CsvDataService} from 'src/app/shared/services/csv-data.service';
import {debounceTime, distinctUntilChanged, Subject, takeUntil} from 'rxjs';

interface test {
  PartNumber: string;
  Name: string;
  imgPath: string;
  Description: string;
  Header: string;
  List: string;
  SubList: string;
  Footer: string;
}

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
            .filter((row: test) => row.PartNumber && row.Name)
            .map((row: test) => ({
              PartNumber: row.PartNumber,
              Name: row.Name,
              imgPath: row.imgPath,
              Description: row.Description,
              Header: row.Header,
              List: row.List.split(';'),
              SubList: row.SubList,
              Footer: row.Footer
            }));
          console.log(this.data)
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
}
