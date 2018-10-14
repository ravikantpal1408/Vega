import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import 'rxjs/add/operator/map';

@Injectable()
export class VehicleService {


  constructor(private http: HttpClient) {

  }

  // Register Vehicle Service
  create(vehicle) {
    return this.http.post('https://localhost:5001/api/vehicles', vehicle)
      .map(res => res);
  }

}



