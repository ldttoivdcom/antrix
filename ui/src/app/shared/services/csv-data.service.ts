import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class CsvDataService {
  constructor(private _http: HttpClient) {}

  getCsvData(url: string): Observable<string> {
    return this._http.get(url, { responseType: 'text' });
  }
}
