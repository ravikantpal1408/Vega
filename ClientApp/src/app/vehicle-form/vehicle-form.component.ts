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
  vehicle: any = {};

  constructor(public makeservice: MakeService) { }

  ngOnInit() {
    this.makeservice.getMakes()
      .subscribe(makes =>
        this.makes = makes
      );
  }

  onMakeChange() {

    // tslint:disable-next-line:triple-equals
    const selectedMake = this.makes.find(m => m.id == this.vehicle.make);
    console.log(selectedMake);
    this.models = selectedMake ? selectedMake.models : [];

  }


}
