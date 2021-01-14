import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Bestelling } from '../shared/bestelling.model';
import { User } from '../shared/user/user.model';
import { UserService } from '../shared/user/user.service';
import { ApiManager } from '../shared/api-manager.service';
import { BestellingDetailComponent } from './bestelling-detail/bestelling-detail.component';

@Component({
  selector: 'app-bestellingen',
  templateUrl: './bestellingen.component.html',
  styleUrls: ['./bestellingen.component.css']
})
export class BestellingenComponent implements OnInit {
  public bestellingen: Bestelling[];
  public user: User;
  bestellingDetail;

  constructor(private api: ApiManager, 
              private route: Router, 
              private userService: UserService) { }

  ngOnInit(): void {
    if (this.userService.user == null){
      this.route.navigate(['login']);
    } else{
      this.user = this.userService.user;
      this.loadBestellingen();
    }
  }

  public closeDetail(){
    this.bestellingDetail = null;
  }

  public viewOrderDate(index: number){
    this.bestellingDetail = this.bestellingen[index]
  }
  
  public onCancel(index?: number): void{
    let id;
    if(index != null){
      id = this.bestellingen[index].id.toString();
    } else {
      id = this.bestellingDetail.id;
    }
      this.api.createDeleteRequest('/order', id).then(
        response => {
          this.loadBestellingen();
        }
      ).catch(error => {
        alert(error.error.error)
      })
  }

  public loadBestellingen(): void{
    if(this.user.role == 'gebruiker'){
      this.api.createGetRequest('/order').then(
        response => {
          this.bestellingen = [...response]
        }
      )
    } else if(this.user.role = 'admin') {
      this.api.createGetRequest('/orders').then(
        response => {
          this.bestellingen = [...response]
        }
      )
    }
  }

  public upgradeStatus(index?: number){
    if(index != null){
      let id = this.bestellingen[index].id;
      this.api.createPutRequest('/order/status/' + id , "")
      this.loadBestellingen();
    } else {
      this.api.createPutRequest('/order/status/' + this.bestellingDetail.id , "")
      this.loadBestellingen();
      this.closeDetail();
    }
  }

  ngAfterViewInit(){
    let elmnt = document.getElementsByClassName("center");
    elmnt[0].scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
  }
}
