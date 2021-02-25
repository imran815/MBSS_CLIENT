import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent implements OnInit {
  
  ngOnInit(): void {
    this.userRolelevel = Number(this.auth.getRoleLevel);
  }

  isExpanded = false;
  userRolelevel: number;

  constructor(public auth: AuthService, private router: Router) {
    
  }



  collapse() {
    this.isExpanded = false;
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
  }

  chngPwd(){
    alert('coming soon');
  }

  logout(){
    localStorage.removeItem('userName');
    localStorage.removeItem('token_value');
    localStorage.removeItem('role_lvl');
    localStorage.removeItem('tchr_lvl');
    //this.router.navigate(['/']);
    location.href = '/';

  }
}
