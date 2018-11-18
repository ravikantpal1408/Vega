import { VehicleService } from '../services/vehicle.service';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-vehicle-list',
  templateUrl: './vehicle-list.component.html',
  styleUrls: ['./vehicle-list.component.css']
})
export class VehicleListComponent implements OnInit {
  private readonly PAGE_SIZE = 3;
  vehicle: any = {};

  queryResult: any;
  makes: any;
  query: any = {
    pageSize: this.PAGE_SIZE
  };
  columns = [
    { title: 'Id' },
    { title: 'Make', key: 'make', isSortable: true },
    { title: 'Model', key: 'model', isSortable: true },
    { title: 'Contact Name', key: 'contactName', isSortable: true },
    {}
  ];



  constructor(
    private vehicleService: VehicleService
  ) {
    console.log('first');
    this.populateVehicles();


  }

  ngOnInit() {

    this.vehicleService.getMakes()
      .subscribe(makes => {
        this.makes = makes;

      });
    console.log('second');
  }



  private populateVehicles() {
    this.vehicleService.getVehicles(this.query)
      .subscribe(result => {
        console.log('queryResult', result);
        this.queryResult = result;
      });
  }
  onFilterChange() {
    this.query.page = 1;
    this.populateVehicles();
  }

  resetFilter() {
    this.query = {
      page: 1,
      pageSize: this.PAGE_SIZE
    };
    this.populateVehicles();
  }


  sortBy(columnName) {
    if (this.query.sortBy === columnName) {
      this.query.isSortAscending = !this.query.isSortAscending;
    } else {
      this.query.sortBy = columnName;
      this.query.isSortAscending = true;
    }
    this.populateVehicles();
  }

  onPageChange(page) {
    this.query.page = page;
    this.populateVehicles();
  }

}
