import { Component, OnInit } from '@angular/core';
import { Products } from 'src/app/models/products.model';
import { Papa } from 'ngx-papaparse';
import { CsvDataService } from 'src/app/shared/services/csv-data.service';
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  data: Products[] = [];
  constructor(private _csvService: CsvDataService, private _papa: Papa) {}
  ngOnInit(): void {
    const csvFileUrl = '../../../../assets/csv/Antrix Product List.csv';
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
            }));
        },
      });
    });
  }
}
