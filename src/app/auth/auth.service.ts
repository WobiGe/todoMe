import { Injectable } from "@angular/core";

export interface AuthResponseData{
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  //First without 2FA- Authentication

  signupUser(email: string, pw: string, pw2: string){

  }

  loginUser(email: string, pw: string){

  }

  logoutUser(){

  }

  autoLoginUser(){

  }

  autoLogoutUser(){

  }

}
