import { MakeService } from './../make.service';
import { Component, OnInit } from '@angular/core';

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
    features: []
  };

  constructor(public makeservice: MakeService) { }

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
    console.log(selectedMake);
    this.models = selectedMake ? selectedMake.models : [];
    delete this.vehicle.modelId;

  }
  onFeatureToggle(featureId, $event) {
    if ($event.target.checked) {
      this.vehicle.features.push(featureId);
    }
    else {
      const index = this.vehicle.features.indexOf(featureId);
      this.vehicle.features.splice(index, 1);
    }

  }

}
