import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginData:{
    UserName:'',
    Password:''
  }

  constructor(private auth:AuthService, 
    private router: Router) { 

      //debugger;
      this.loginData = Object();
      this.loginData.UserName = '';
      this.loginData.Password = '';

    }

  ngOnInit() {
  }

  login(){
    this.auth.login(this.loginData).subscribe((data:any) => {
      console.log(data);
      localStorage.setItem('userName', data.UserName);
      localStorage.setItem('token_value', data.Token);
      localStorage.setItem('role_lvl', data.RoleLevel);
      localStorage.setItem('tchr_lvl', data.LevelId);

      //this.router.navigate(['/']);
      location.href = '/';


    },
    (error) => {
      console.log(error);
      alert(error.error.Message);
    });
  }

  cancel(){
    this.router.navigate(['/']);
  }

  
  //(keyup)="enterKeyPrss1()" 
  // enterKeyPrss(){
  //   alert('hehe');
  // }

  //(keydown)="onKeydown1($event)"
  // onKeydown(event){
  //   if (event.key === "Enter") {
  //     console.log(event);
  //   }
  // }

}
