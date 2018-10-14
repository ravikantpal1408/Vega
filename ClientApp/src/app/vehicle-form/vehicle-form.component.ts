import { VehicleService } from './../vehicle.service';
import { MakeService } from './../make.service';
import { Component, OnInit } from '@angular/core';
import { ToastyService } from 'ng2-toasty';

@Component({
  selector: 'app-vehicle-form',
  templateUrl: './vehicle-form.component.html',
  styleUrls: ['./vehicle-form.component.css']
})
export class VehicleFormComponent implements OnInit {

  makes: any = [];
  models: any[];
  features: any = [];
  vehicle: any = {
    features: [],
    contact: {}
  };

  constructor(
    public makeservice: MakeService,
    public vehicleService: VehicleService,
    private toastyService: ToastyService
  ) { }

  ngOnInit() {
    this.makeservice.getMakes()
      .subscribe(makes =>
        this.makes = makes
      );


    this.makeservice.getFeatures().
      subscribe(features => this.features = features);
  }

  onMakeChange() {

    // tslint:disable-next-line:triple-equals
    const selectedMake = this.makes.find(m => m.id == this.vehicle.makeId);
    // console.log(selectedMake);
    this.models = selectedMake ? selectedMake.models : [];
    delete this.vehicle.modelId;

  }
  onFeatureToggle(featureId, $event) {
    if ($event.target.checked) {
      this.vehicle.features.push(featureId);
    }
    // tslint:disable-next-line:one-line
    else {
      const index = this.vehicle.features.indexOf(featureId);
      this.vehicle.features.splice(index, 1);
    }

  }

  submit() {
    this.vehicleService.create(this.vehicle).
      subscribe(
        x => console.log(x),
        error => {
          // tslint:disable-next-line:triple-equals
          if (error.status == 400) {
            this.toastyService.error({
              title: 'Error',
              msg: 'An Unwxpected Error Happened ',
              theme: 'default',
              showClose: true,
              timeout: 5000
            });
          }
        });
  }

}
