
import { VehicleService } from './../vehicle.service';
import { Component, OnInit } from '@angular/core';
import { ToastyService } from 'ng2-toasty';
import { SaveVehicle, Vehicle } from '../models/vehicle';
import { ActivatedRoute, Router } from '@angular/router';

import * as _ from 'underscore';
import 'rxjs/add/Observable/forkJoin';

@Component({
  selector: 'app-vehicle-form',
  templateUrl: './vehicle-form.component.html',
  styleUrls: ['./vehicle-form.component.css']
})
export class VehicleFormComponent implements OnInit {
  makes: any = [];
  models: any = [];
  features: any = [];
  vehicleData: any;
  vehicle: SaveVehicle = {
    id: 0,
    makeId: 0,
    modelId: 0,
    isRegistered: false,
    features: [],
    contact: {
      name: '',
      email: '',
      phone: '',
    }
  };


  constructor(

    private vehicleService: VehicleService,
    private toastyService: ToastyService,
    private route: ActivatedRoute,
    private router: Router,

  ) {


    route.params.subscribe(p => {
      this.vehicle.id = +p['id'] + 0;
    });

  }

  ngOnInit() {
    this.vehicleService.getMakes().subscribe(x => {
      console.log('Make => ', x);
      this.makes = x;
    });
    this.vehicleService.getFeatures().subscribe(x => {
      console.log('Features =>', x);
      this.features = x;
    });
    // tslint:disable-next-line:triple-equals
    if (this.vehicle.id != NaN) {
      console.log('ravi', this.vehicle.id);
      this.vehicleService.getVehicle(this.vehicle.id).subscribe(vehicle => {
        console.log('getVehicles', vehicle);
        this.vehicleData = vehicle;
        this.vehicle = this.vehicleData;
        console.log('jello=>', this.vehicle);
      });
    }


  }


  onMakeChange() {
    this.populateModels();

    delete this.vehicle.modelId;

  }
  onFeatureToggle(featureId, $event) {
    if ($event.target.checked) {
      this.vehicle.features.push(featureId);
    } else {
      const index = this.vehicle.features.indexOf(featureId);
      this.vehicle.features.splice(index, 1);
    }

  }

  private populateModels() {
    // tslint:disable-next-line:triple-equals
    const selectedMake = this.makes.find(m => m.id == this.vehicle.makeId);
    this.models = selectedMake ? selectedMake.models : [];
  }

  submit() {
    if (this.vehicle.id) {
      this.vehicleService.update(this.vehicle)
        .subscribe(x => {
          this.toastyService.success({
            title: 'Success',
            msg: 'The vehicle was sucessfully updated.',
            theme: 'bootstrap',
            showClose: true,
            timeout: 5000
          });
        });
    } else {
      this.vehicleService.create(this.vehicle)
        .subscribe(x => console.log(x));

    }

  }

  delete() {
    if (confirm('Are you sure?')) {
      this.vehicleService.delete(this.vehicle.id)
        .subscribe(x => {
          this.router.navigate(['/home']);
        });
    }
  }

}
