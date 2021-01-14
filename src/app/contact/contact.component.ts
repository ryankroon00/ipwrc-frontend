import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit(){
    let elmnt = document.getElementsByClassName("center");
    elmnt[0].scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
  }
}
