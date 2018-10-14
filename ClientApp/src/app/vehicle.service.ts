import { SaveVehicle } from './models/vehicle';
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

  getVehicle(id) {
    return this.http.get('https://localhost:5001/api/vehicles/' + id)
      .map(res => res);
  }

  update(vehicle: SaveVehicle) {
    return this.http.put('https://localhost:5001/api/vehicles/' + vehicle.id, vehicle)
      .map(res => res);
  }

  delete(id) {
    return this.http.delete('https://localhost:5001/api/vehicles/' + id)
      .map(res => res);
  }

}



