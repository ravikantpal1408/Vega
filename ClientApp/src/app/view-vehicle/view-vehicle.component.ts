import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { VehicleService } from '../vehicle.service';
import { ToastyService } from 'ng2-toasty';
import { ActivatedRoute, Router } from '@angular/router';
import { SaveVehicle, Vehicle } from '../models/vehicle';
import _ = require('underscore');
import { PhotoService } from '../photo.service';

@Component({
  selector: 'app-view-vehicle',
  templateUrl: './view-vehicle.component.html',
  styleUrls: ['./view-vehicle.component.css']
})
export class ViewVehicleComponent implements OnInit {

  @ViewChild('fileInput') fileInput: ElementRef;
  vehicleData: any;
  photos: any = [];

  vehicle: Vehicle = {
    id: 0,
    make: { id: 0, name: '' },
    model: { id: 0, name: '' },
    isRegistered: false,
    features: [],
    contact: {
      name: '',
      email: '',
      phone: '',
    },
    lastUpdate: ''
  };

  constructor(
    private vehicleService: VehicleService,
    private route: ActivatedRoute,
    private router: Router,
    private photoService: PhotoService,
    private toastyService: ToastyService
  ) {

    route.params.subscribe(p => {
      this.vehicle.id = +p['id'] || 0;
    });

  }

  ngOnInit() {
    this.photoService.getPhotos(this.vehicle.id)
      .subscribe(photos => {
        this.photos = photos;
      }
      );



    if (this.vehicle.id) {

      this.vehicleService.getVehicle(this.vehicle.id).subscribe(v => {

        this.vehicleData = v;
        this.vehicle = this.vehicleData;
        // Setting values from database to form

        console.log('view-vehicle-data', this.vehicle);
        // this.setVehicle(this.vehicleData);

      });
    }
  }
  delete() {
    if (confirm('Are you sure?')) {
      this.vehicleService.delete(this.vehicle.id)
        .subscribe(x => {
          this.router.navigate(['/allVehicles']);
        });
    }
  }

  uploadPhoto() {

    const nativeElement: HTMLInputElement = this.fileInput.nativeElement;
    console.log('Vehicle Id :', this.vehicle.id);
    this.photoService.upload(this.vehicle.id, nativeElement.files[0])
      .subscribe(photo => {
        console.log(photo);
        this.photos.push(photo);

      });


  }
}
