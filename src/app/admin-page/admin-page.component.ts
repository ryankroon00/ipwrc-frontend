import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiManager } from '../shared/api-manager.service';
import { User } from '../shared/user/user.model';
import { UserService } from '../shared/user/user.service';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.css']
})
export class AdminPageComponent implements OnInit {
  public users: User[];
  constructor(private api: ApiManager, private route: Router, private user: UserService) { }

  ngOnInit(): void {
    this.loadUsers();
  }
   
  loadUsers(){
    this.api.createGetRequest('/users').then(
      result => {
        this.users = [...result]
      }
    ).catch((error) => {
      alert("now allowed")
      this.route.navigate(['']);
    }
    );
  }

  changeRole(id: number) {
    const data = {userId: id}
    this.api.createPostRequest('/user/role', JSON.stringify(data)).then(
      result => {
        this.user.user = result; 
        alert("role changed")
        this.loadUsers();
      }
    ).catch((error) => {
      alert("failed")
    }
    );
  }
  removeUser(id: number){
    const data ="" + id
    this.api.createDeleteRequest('/users', data).then(
      result => {
        alert("removed user")
        this.loadUsers();
      }
    ).catch((error) => {
      console.log(error)
    }
    );
  }
}
