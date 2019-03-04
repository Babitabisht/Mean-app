import { Component, OnInit } from '@angular/core';
import {ValidateService} from '../../services/validate.service';
import {AuthService} from '../../services/auth.service';

import {FlashMessagesService}   from 'angular2-flash-messages';
import {Router} from '@angular/router' ;


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

name:String;
username:String;
email:String;
password:String;


  constructor(private ValidateService: ValidateService ,private flashMessage:FlashMessagesService,
    private AuthService:AuthService,
    private router:Router
    ) { }

  ngOnInit() {
  }

  onRegisterSubmit(){

const user={
  name:this.name,
  username:this.username,
  email:this.email,
  password:this.password
}

if(!this.ValidateService.validateRegister(user)    ){
  this.flashMessage.show("Please fill in all the fields",{cssClass:'alert-danger',timeout:3000})
  return false;
}

if(!this.ValidateService.validateEmail(user.email)    ){
  
  this.flashMessage.show("Please fill the valid email",{cssClass:'alert-danger',timeout:3000})


  return false;
}


this.AuthService.registerUser(user).subscribe(  (data:any)=>{

if(data.success){

  this.flashMessage.show("Registered !",{cssClass:'alert-success',timeout:3000});

  this.router.navigate(['/login'])

}else{

  this.flashMessage.show("wrong !something went ",{cssClass:'alert-danger',timeout:3000});

  this.router.navigate(['/register'])


}



})


  }


 
}
