import {Component, OnInit} from '@angular/core';
import {FAQ} from 'src/app/models/FAQ.model';
import {Papa} from 'ngx-papaparse';
import {CsvDataService} from 'src/app/shared/services/csv-data.service';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss'],
})
export class FAQComponent implements OnInit {
  FAQList: FAQ[] = [];

  constructor(private _csvDataService: CsvDataService, private _papa: Papa) {
  }

  ngOnInit(): void {
    const csvFileUrl = '../../../assets/csv/faq_list.csv';
    this._csvDataService.getCsvData(csvFileUrl).subscribe((csvData) => {
      this._papa.parse(csvData, {
        header: true,
        complete: (result) => {
          this.FAQList = result.data
            .filter((row: FAQ) => row.question)
            .map((row: FAQ) => ({
              question: row.question,
              answer: row.answer,
              answerList: row.answerList.split(';'),
            }));
          console.log(this.FAQList);
        },
      });
    });
  }
}
