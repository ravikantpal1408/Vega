import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { VehicleService } from '../services/vehicle.service';
import { ToastyService } from 'ng2-toasty';
import { ActivatedRoute, Router } from '@angular/router';
import { Vehicle } from '../models/vehicle';
import _ = require('underscore');
import { PhotoService } from '../services/photo.service';
import { NgProgress } from 'ngx-progressbar';


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
    private toastyService: ToastyService,
    public progressService: NgProgress

  ) {

    route.params.subscribe(p => {
      this.vehicle.id = +p['id'] || 0;
    });

  }

  ngOnInit() {
    this.progressService.start();
    this.photoService.getPhotos(this.vehicle.id)
      .subscribe(photos => {

        this.progressService.done();

        this.photos = photos;
      });



    if (this.vehicle.id) {

      this.vehicleService.getVehicle(this.vehicle.id).subscribe(v => {

        this.vehicleData = v;
        this.vehicle = this.vehicleData;
        // Setting values from database to form
        this.progressService.done();
        console.log('view-vehicle-data', this.vehicle);
        // this.setVehicle(this.vehicleData);

      });
    }
  }
  delete() {
    if (confirm('Are you sure?')) {
      this.progressService.start();
      this.vehicleService.delete(this.vehicle.id)
        .subscribe(x => {
          this.progressService.done();
          this.router.navigate(['/allVehicles']);
        });
    }
  }

  uploadPhoto() {
    this.progressService.start();
    const nativeElement: HTMLInputElement = this.fileInput.nativeElement;
    console.log('Vehicle Id :', this.vehicle.id);
    this.photoService.upload(this.vehicle.id, nativeElement.files[0])
      .subscribe(photo => {
        console.log(photo);
        this.progressService.done();
        this.photos.push(photo);
      });
  }
}
