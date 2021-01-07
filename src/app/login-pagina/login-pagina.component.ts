import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiManager } from '../shared/api-manager.service';
import { User } from '../shared/user/user.model';
import { UserService } from '../shared/user/user.service';

@Component({
  selector: 'app-login-pagina',
  templateUrl: './login-pagina.component.html',
  styleUrls: ['./login-pagina.component.css']
})
export class LoginPaginaComponent implements OnInit {
  public login = true;
  public loggedIn: boolean;
  public isLoading = false;
  public user: User;
  public form: FormGroup;
  public error: string = null;
  public username: string;
  public email: string;
  public postcode: string;
  
  constructor(private route: Router,
              private userService: UserService,
              private api: ApiManager
              ) { }

  ngOnInit(): void {
    if (this.userService.user != null){
      this.loggedIn = true;
      this.user = this.userService.user;
    } else {
      this.loggedIn = false;
    }
  }
  onLogin(form: NgForm): void{
    this.isLoading = true;

    const userData = { username: form.value.username, password: form.value.password}
    const loginPromise = this.api.createPostRequest('/user/login', JSON.stringify(userData));

    loginPromise.then(
      response => {
        const loggedInUser = new User(response.id, response.username, response.email, response.adres, response.postcode);
        loggedInUser.jwt = response.refreshToken;
        loggedInUser.role = response.role;
        this.api.setBearerToken(loggedInUser.jwt);
        this.userService.user = loggedInUser;
        this.route.navigate(['']);
        this.isLoading = false;
      }
    ).catch((error) => {
      this.error = error.error.error;
      this.isLoading = false;
    });
    this.username = form.value.username;
  }

  onRegister(form: NgForm): void{
    this.isLoading = true;

    const userData = { username: form.value.username, password: form.value.password, email: form.value.email, postcode: form.value.postcode, adres: form.value.adres}
    const registerPromise = this.api.createPostRequest('/user/register', JSON.stringify(userData));

    registerPromise.then(
      response => {
        this.login = true;
        this.isLoading = false;
        this.error = "register succesvol";
        this.isLoading = false;
      }
    ).catch((error) => {
      this.error = error.error.error;
      this.isLoading = false;
    });
    this.username = form.value.username;
    this.email = form.value.email;
    this.postcode = form.value.postcode;
  }

  logout(): void{
    this.userService.user = null;
    this.loggedIn = false;
    this.user = null;
    this.api.removeBearerToken();
  }

  onHandleError() {
    this.error = null;
    this.isLoading = false;
  }
  ngAfterViewInit(){
    let elmnt = document.getElementsByClassName("center");
    elmnt[0].scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
  }
}
