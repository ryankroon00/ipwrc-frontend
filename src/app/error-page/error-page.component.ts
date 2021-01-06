import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Data } from '@angular/router';

@Component({
  selector: 'app-error-page',
  templateUrl: './error-page.component.html',
  styleUrls: ['./error-page.component.css']
})
export class ErrorPageComponent implements OnInit {
  public error: string = null;

  constructor(private route: ActivatedRoute, 
    ) {}

 ngOnInit() {
    //this.errorMessage = this.route.snapshot.data['message'];
    this.route.data.subscribe(
      (data: Data) => {this.error = data['message']}
    )
  }

  onHandleError() {
    this.error = null;
  }
}
