import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private authService:AuthService,
    
    private router :Router,
    private flashMessage :FlashMessagesService
    
    ) { }

  ngOnInit() {
  }


  onLogoutClick(){

this.authService.logout();
this.flashMessage.show('Logged out !',{cssClass:'alert-success',timeout:5000})
this.router.navigate(['/login']);
return false;
  }
}
