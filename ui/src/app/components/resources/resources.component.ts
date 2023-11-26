import {Component, OnInit} from '@angular/core';
import {Papa} from 'ngx-papaparse';
import {CsvDataService} from 'src/app/shared/services/csv-data.service';
import {Regulations} from 'src/app/models/regulations.model';

@Component({
  selector: 'app-resources',
  templateUrl: './resources.component.html',
  styleUrls: ['./resources.component.scss'],
})
export class ResourcesComponent implements OnInit {
  regulations: Regulations[] = [];

  constructor(private _csvService: CsvDataService, private _papa: Papa) {
  }

  ngOnInit(): void {
    const csvFileUrl = '../../../assets/csv/resources_data-1.csv';
    this._csvService.getCsvData(csvFileUrl).subscribe((csvData) => {
      this._papa.parse(csvData, {
        header: true,
        complete: (result) => {
          this.regulations = result.data
            .filter((row: Regulations) => row.WebLinks && row.Regulations)
            .map((row: Regulations) => ({
              WebLinks: row.WebLinks,
              Regulations: row.Regulations,
              href: row.href
            }));
        },
      });
    });
  }
}
