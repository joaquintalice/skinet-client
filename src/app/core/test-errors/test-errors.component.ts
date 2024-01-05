import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { environment } from 'src/app/environments/environment';

@Component({
  selector: 'app-test-errors',
  templateUrl: './test-errors.component.html',
  styleUrls: ['./test-errors.component.scss']
})
export class TestErrorsComponent {
  baseUrl = environment.apiUrl;
  validationErrors: string[]= [];

  constructor(private http: HttpClient) {}

  get404Error() {
    this.http.get(this.baseUrl + 'products/42').subscribe({
      next: res=> console.log(res),
      error: error=>console.log(error)
    })
  }

  get500Error() {
    this.http.get(this.baseUrl + 'buggy/servererror').subscribe({
      next: res=> console.log(res),
      error: error=>console.log(error)
    })
  }

  get400Error() {
    this.http.get(this.baseUrl + 'buggy/badrequest').subscribe({
      next: res=> console.log(res),
      error: error=>console.log(error)
    })
  }

  get400ValidationError() {
    this.http.get(this.baseUrl + 'products/fortytwo').subscribe({
      next: res=> console.log(res),
      error: error=> {
        console.log(error)
        this.validationErrors = error.errors;
        console.log(this.validationErrors)
      }
    })
  }

}
