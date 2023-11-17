import { Component, OnInit } from '@angular/core';
import { CsvDataService } from 'src/app/shared/services/csv-data.service';
import { Member } from 'src/app/models/member.model';
import { Papa } from 'ngx-papaparse';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
})
export class AboutComponent implements OnInit {
  data: Member[] = [];
  activeItemIndex: number | null = null;

  constructor(private _csvService: CsvDataService, private papa: Papa) {}

  ngOnInit(): void {
    const csvFileUrl = '../../../assets/csv/member_data.csv';
    this._csvService.getCsvData(csvFileUrl).subscribe((csvData) => {
      this.papa.parse(csvData, {
        header: true,
        complete: (result) => {
          this.data = result.data
            .filter((row: Member) => row.name && row.title)
            .map((row: Member) => ({
              imgPath: row.imgPath,
              name: row.name,
              title: row.title,
              description: row.description,
            }));
        },
      });
    });
  }

  showModal(index: number): void {
    this.activeItemIndex = index;
  }

  closeModal(): void {
    console.log('closeModal');
    this.activeItemIndex = null;
  }

  isOverlayHidden(i: number): boolean {
    return this.activeItemIndex !== i;
  }

  // handleCancel(): void {
  //   this.isVisible = false;
  // }
}
