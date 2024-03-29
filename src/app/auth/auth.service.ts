import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { BehaviorSubject, catchError, tap, throwError } from "rxjs";
import { User } from "./user.model";
import { Router } from "@angular/router";
import { environment } from "src/environments/environment";

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
  user = new BehaviorSubject<User | null>(null);
  private tokenExpirationtimer: any;
  constructor(private http: HttpClient, private router: Router){}

  /**
   * @description sign up the user with email and password credentials
   * @param email email adress of the current user
   * @param pw password of the current user
   * @returns returns an observable of type AuthResponseData
   */
  signupUser(email: string, pw: string){
    return this.http.post<AuthResponseData>(
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + environment.firebaseAPIKey,
      {
        email: email,
        password: pw,
        returnSecureToken: true
      }
    ).pipe(
      catchError(this.handleError),
      tap(responseData => {
        this.handleAuthentication(responseData.email, responseData.localId, responseData.idToken, +responseData.expiresIn);
    }))
  }

  loginUser(email: string, pw: string){
    return this.http.post<AuthResponseData>(
      'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + environment.firebaseAPIKey,
    {
      email: email,
      password: pw,
      returnSecureToken: true
    }
    ).pipe(
      catchError(this.handleError),
      tap(responseData => {
        this.handleAuthentication(responseData.email, responseData.localId, responseData.idToken, +responseData.expiresIn);
    }))
  }

  logoutUser(){
    this.user.next(null);
    this.router.navigate(['/auth']);
    localStorage.removeItem('userData');
    if(this.tokenExpirationtimer){
      clearTimeout(this.tokenExpirationtimer)
    }
    this.tokenExpirationtimer = null;
  }

  autoLoginUser(){
    const userData: {
      email: string;
      id: string;
      _token: string;
      _tokenExpirationDate: Date;
    } = JSON.parse(localStorage.getItem('userData')!);
    if(!userData){
      return;
    }

    const loadedUser = new User(
      userData.email,
      userData.id,
      userData._token,
      new Date(userData._tokenExpirationDate)
    );

    if(loadedUser.userToken){
      this.user.next(loadedUser);
      const expirationDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
      this.autoLogoutUser(expirationDuration);
    }
  }

  autoLogoutUser(expirationDuration: number){
    this.tokenExpirationtimer = setTimeout(()=>{
      this.logoutUser();
    },expirationDuration)
  }

  private handleAuthentication(email: string, userId: string, token: string, expiration: number){
    const expirationDate = new Date(new Date().getTime() + expiration * 1000);
    const user = new User(email,userId,token,expirationDate);
    this.user.next(user);
    this.autoLogoutUser(expiration * 1000);
    localStorage.setItem('userData', JSON.stringify(user));
  }

  private handleError(errorResponse: HttpErrorResponse){
    let errorMsg = "An unknown error occured";
    console.log(errorResponse)
    if(!errorResponse.error || !errorResponse.error.error){
      return throwError(()=> new Error(errorMsg));
    }

    switch(errorResponse.error.error.message){
      case 'EMAIL_EXISTS':
        errorMsg = "Email already exists!"
        break;
      case 'EMAIL_NOT_FOUND':
        errorMsg = "Email not found. Please check your credentials!"
        break;
      case 'INVALID_PASSWORD':
        errorMsg = "Wrong Password!"
        break;
    }

    return throwError(()=> new Error(errorMsg));
  }
}
