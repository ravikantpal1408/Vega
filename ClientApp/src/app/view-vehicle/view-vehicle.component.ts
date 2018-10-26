import { Component, OnInit } from '@angular/core';
import { VehicleService } from '../vehicle.service';
import { ToastyService } from 'ng2-toasty';
import { ActivatedRoute, Router } from '@angular/router';
import { SaveVehicle, Vehicle } from '../models/vehicle';
import _ = require('underscore');

@Component({
  selector: 'app-view-vehicle',
  templateUrl: './view-vehicle.component.html',
  styleUrls: ['./view-vehicle.component.css']
})
export class ViewVehicleComponent implements OnInit {

  vehicleData: any;

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
    private toastyService: ToastyService
  ) {

    route.params.subscribe(p => {
      this.vehicle.id = +p['id'] || 0;
    });

  }

  ngOnInit() {
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


}
