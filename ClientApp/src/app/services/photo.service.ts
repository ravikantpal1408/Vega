import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

@Injectable()
export class PhotoService {

  constructor(private http: HttpClient) { }

  upload(vehicleId, photo) {
    const formData = new FormData();
    formData.append('file', photo);

    return this.http.post(`https://localhost:5001/api/vehicles/${vehicleId}/photos`, formData)
      .map(res => res);
  }

  getPhotos(vehicleId) {
    return this.http.get(`https://localhost:5001/api/vehicles/${vehicleId}/photos`)
      .map(res => res);
  }
}
