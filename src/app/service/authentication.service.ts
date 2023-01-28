import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  login(username: string, password: string):boolean  {  
    if (username == "sara" && password == "ebra") {  
      localStorage.setItem('username', username);  
      localStorage.setItem('currentUserStatus', "loggedin");  
      return true;  
    }  
    return false;
  }  
  logout() {  
    localStorage.removeItem('username'); 
    localStorage.removeItem('currentUserStatus');  
  }  
  public get loggedIn(): boolean {  
    return (localStorage.getItem('currentUserStatus') !== null);  
  }  
} 
