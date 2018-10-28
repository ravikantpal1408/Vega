import { SaveVehicle } from '../models/vehicle';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import 'rxjs/add/operator/map';

@Injectable()
export class VehicleService {
  private readonly vehiclesEndpoint = 'https://localhost:5001/api/vehicles';

  constructor(private http: HttpClient) {

  }

  getFeatures() {
    return this.http.get('https://localhost:5001/api/features')
      .map(res => res);
  }

  getMakes() {
    return this.http.get('https://localhost:5001/api/makes')
      .map(res => res);
  }

  create(vehicle) {
    return this.http.post(this.vehiclesEndpoint, vehicle)
      .map(res => res);
  }

  getVehicle(id) {
    console.log('Id=>', id);
    return this.http.get('https://localhost:5001/api/vehicles' + '/' + id)
      .map(res => res);
  }

  getVehicles(filter) {
    return this.http.get(this.vehiclesEndpoint + '?' + this.toQueryString(filter))
      .map(res => res);
  }

  toQueryString(obj) {
    const parts = [];
    // tslint:disable-next-line:forin
    for (const property in obj) {
      const value = obj[property];
      // tslint:disable-next-line:triple-equals
      if (value != null && value != undefined) {
        parts.push(encodeURIComponent(property) + '=' + encodeURIComponent(value));
      }
    }

    return parts.join('&');
  }

  update(vehicle: SaveVehicle) {
    return this.http.put(this.vehiclesEndpoint + '/' + vehicle.id, vehicle)
      .map(res => res);
  }

  delete(id) {
    return this.http.delete(this.vehiclesEndpoint + '/' + id)
      .map(res => res);
  }

  getAllVehicle() {
    return this.http.get(this.vehiclesEndpoint)
      .map(res => res);
  }

}



