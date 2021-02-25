import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppSettings } from './appSettings';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  baseUrl: string = '';
  
  constructor(private http: HttpClient) {
    this.baseUrl = AppSettings.WEB_API_ENDPOINT + 'auth/';
   }

   register(){
    return this.http.get(this.baseUrl + 'Register');
  }

  login(loginData){
    return this.http.post(this.baseUrl + 'Login', loginData);
  }

  changepwd(user){
    return this.http.post(this.baseUrl+'ChangePassword', user);
  }

  get getUserName(){
    return localStorage.getItem('userName');
  }

  get getRoleLevel(){
    return localStorage.getItem('role_lvl');
  }

  get getTchrLevelID(){
    return localStorage.getItem('tchr_lvl');
  }

  get isAuthenticated(){
    return !!localStorage.getItem('token_value');
  }
  

}
