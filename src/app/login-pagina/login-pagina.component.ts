import { Component, OnInit } from '@angular/core';
import { FormGroup, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { rejects } from 'assert';
import { User } from '../shared/user/user.model';
import { UserService } from '../shared/user/user.service';
import { ApiManager } from '../utils/api-manager.service';

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

  constructor(private route: Router,
              private userService: UserService,
              private api: ApiManager) { }

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
    const registerPromise = this.api.createPostRequest('/user/login', JSON.stringify(userData));

    registerPromise.then(
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
      alert(error.error.error)
      this.isLoading = false;
    });
  }

  onRegister(form: NgForm): void{
    this.isLoading = true;

    const userData = { username: form.value.username, password: form.value.password, email: form.value.email, postcode: form.value.postcode, adres: form.value.adres}
    const registerPromise = this.api.createPostRequest('/user/register', JSON.stringify(userData));

    registerPromise.then(
      response => {
        this.login = true;
        this.isLoading = false;
        alert("register succesvol")
      }
    ).catch((error) => {
      alert(error.error.error)
      this.isLoading = false;
    });
  }

  logout(): void{
    this.userService.user = null;
    this.loggedIn = false;
    this.user = null;
    this.api.removeBearerToken();
  }
}
