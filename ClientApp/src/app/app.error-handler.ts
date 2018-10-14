import { ToastyService } from 'ng2-toasty';
import { ErrorHandler, Inject, NgZone } from '@angular/core';


export class AppErrorHandler implements ErrorHandler {


  constructor(
    private ngZone: NgZone,
    @Inject(ToastyService) public toastyService: ToastyService) { /* Constructor Block */ }

  handleError(error: any): void {

    this.ngZone.run(() => {
      this.toastyService.error({
        title: 'Error',
        msg: 'Something Went Wrong',
        showClose: true,
        timeout: 5000,
        theme: 'bootstrap'
      });
    });
    // console.log('Error');

  }

}
