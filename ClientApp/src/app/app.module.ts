
// Modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { ToastyModule } from 'ng2-toasty';
// import { UniversalModule } from 'angular2-universal';

// Services
import { VehicleService } from './vehicle.service';
import { MakeService } from './make.service';
// Components
import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { CounterComponent } from './counter/counter.component';
import { FetchDataComponent } from './fetch-data/fetch-data.component';
import { VehicleFormComponent } from './vehicle-form/vehicle-form.component';
import { VehicleListComponent } from './vehicle-list/vehicle-list.component';
import { AppErrorHandler } from './app.error-handler';
import { ErrorHandler } from '@angular/core';
import { PaginationComponent } from './shared/pagination.component';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    CounterComponent,
    FetchDataComponent,
    VehicleFormComponent,
    VehicleListComponent,
    PaginationComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    // UniversalModule,
    ToastyModule.forRoot(),
    RouterModule.forRoot([

      { path: '', redirectTo: 'vehicles', pathMatch: 'full' },
      // Create New Vehicles
      { path: 'vehicles/new', component: VehicleFormComponent },
      // Diplayes vehicle of selected Id
      { path: 'vehicles/:id', component: VehicleFormComponent },
      // Displays all vehicles
      { path: 'allVehicles', component: VehicleListComponent },
      // Home page
      { path: 'home', component: HomeComponent },
      // Counter Page
      { path: 'counter', component: CounterComponent },
      // Show Temperature Page
      { path: 'fetch-data', component: FetchDataComponent },
      // Redirects to Home page for wrong Urls
      { path: '**', redirectTo: 'home' }
    ])
  ],
  providers: [
    MakeService,
    VehicleService,
    { provide: ErrorHandler, useClass: AppErrorHandler }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
