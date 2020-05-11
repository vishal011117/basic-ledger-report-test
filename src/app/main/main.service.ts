import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { error } from '@angular/compiler/src/util';

@Injectable({
  providedIn: 'root'
})
export class MainService {
  header = {
    url: 'https://7u7mg3dblk.execute-api.ap-south-1.amazonaws.com/test/token_ledger_report',
    httpOptions: { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) },
    body: { user_id: 27, interval:'year' }
  }
  types = {
    'LAST 30 DAYS': 'month',
    'LAST WEEK': 'week',
    'LAST YEAR': 'year'
  }

  constructor(
    public http: HttpClient,
  ) {}

  public getData(type): Observable<any> {
    const {url, httpOptions, body} = this.header;
    console.log(type);
    
    return this.http.post(url, { ...body, interval: this.types[type] }, httpOptions)
  }
}
