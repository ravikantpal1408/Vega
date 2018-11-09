import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import 'rxjs/add/operator/map';


@Injectable()
export class MakeService {

  constructor(private http: HttpClient) {

  }

  getMakes() {
    return this.http.get('https://localhost:5001/api/makes')
      .map(res => res);
  }

  getFeatures() {
    return this.http.get('https://localhost:5001/api/features')
      .map(res => res);
  }

}
