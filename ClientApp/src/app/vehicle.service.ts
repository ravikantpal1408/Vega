import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import 'rxjs/add/operator/map';

@Injectable()
export class VehicleService {

  urls: 'https://localhost:5000';
  constructor(private http: HttpClient) {

  }

  // Register Vehicle Service
  create(vehicle) {
    return this.http.post('/api/vehicles', vehicle)
      .map(res => res);
  }

}



