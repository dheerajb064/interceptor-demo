import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  constructor(private http: HttpClient) {}
  title = 'interceptor-demo';
  public handleValidApi(): void {
    this.http
      .get('https://fakestoreapi.com/products/1')
      .subscribe((data) => console.log(data));
  }
  public handleInvalidApi(): void {
    this.http
      .get('https://jsonplaceholder.typicode.com/nonexistentendpoint')
      .subscribe((error) => console.log(error)
      );
  }
}
