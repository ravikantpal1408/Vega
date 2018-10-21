import { VehicleService } from './../vehicle.service';
import { Component, OnInit } from '@angular/core';
import { ToastyService } from 'ng2-toasty';

@Component({
  selector: 'app-vehicle-list',
  templateUrl: './vehicle-list.component.html',
  styleUrls: ['./vehicle-list.component.css']
})
export class VehicleListComponent implements OnInit {

  vehicle: any = {};

  constructor(
    private vehicleService: VehicleService,
    private toastyService: ToastyService
  ) { }

  ngOnInit() {
    this.vehicleService.getAllVehicle()
      .subscribe(x => {
        console.log(x);
        this.vehicle = x;
        console.log('x => ', this.vehicle);
      });
  }

}
