import { Injectable } from '@angular/core';
// import { HttpClientModule } from '@angular/common/http';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import 'rxjs/Rx';
import { catchError, map } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Observable, Subject } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { getToken } from '@angular/router/src/utils/preactivation';
import { tokenNotExpired } from 'angular2-jwt';
 

@Injectable({
  providedIn: 'root'
})
export class AuthService {
authToken:any;
user:any;


  constructor(private http:HttpClient) { }

registerUser(user){
let headers=new HttpHeaders();
headers.append('Content-Type' , 'application/json'); 

return this.http.post('http://localhost:3000/users/register',user,{headers:headers})

}

Authenticate(user)
{
  let headers=new HttpHeaders();
  headers.append('Content-Type' , 'application/json');
  
  return this.http.post('http://localhost:3000/users/authenticate',user,{headers:headers})
  
}
storeUserData(token ,user){

console.log(token); 
 console.log(user);
 localStorage.setItem('id_token' ,token);
 localStorage.setItem('user',JSON.stringify(user));
 this.authToken=token;
 this.user=user;
}

getProfile(){

this.getToken();
 // let headers=new Headers();
  // headers.append('Authorization',this.authToken);
  
  // headers.append('Content-Type' , 'application/json');
  const headers = new HttpHeaders({
    'Content-Type':  'application/json',
    'Authorization': this.authToken
  });
 
  return this.http.get('http://localhost:3000/users/profile',{headers :headers})
}

getToken(){

const token=
localStorage.getItem('id_token');
this.authToken=token;

}
loggedIn() {
  return tokenNotExpired('id_token');
}

logout(){
  this.user=null
  this.authToken=null
  localStorage.clear()
}





}
