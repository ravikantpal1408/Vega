// import { HttpClient } from '@angular/common/http';
// import { Injectable } from '@angular/core';
// import 'rxjs/add/operator/map';
// import { Subject } from 'rxjs/Subject';
// import { BrowserXhr } from '@angular/common/http/src/xhr';


// @Injectable()
// export class ProgressService {

//   uploadProgress: Subject<any> = new Subject();
//   downloadProgress: Subject<any> = new Subject();


//   constructor(private http: HttpClient) {

//   }

//   // XMLHttpRequest
//   // BrowserXhr => Browser Http Request

// }


// @Injectable()
// export class BrowserXhrWithRequest extends BrowserXhr {

//   constructor(private service: ProgressService) {
//     super();
//   }


//   build(): XMLHttpRequest {
//     const xhr: XMLHttpRequest = super.build();
//     xhr.onprogress = (event) => {
//       this.service.downloadProgress.next(this.createProgress(event));
//       // tslint:disable-next-line:no-shadowed-variable
//       xhr.upload.onprogress = (event) => {
//         this.service.uploadProgress.next(this.createProgress(event));
//       };
//     };
//     return xhr;
//   }

//   private createProgress(event) {
//     return {
//       total: event.total,
//       percentage: Math.round(event.loaded / event.total * 100)
//     };
//   }
// }
