import { Component,OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { AlertComponent } from '../shared/alert/alert.component';
import { AuthResponseData, AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  signUpClicked: boolean = false;
  error: string = "";
  private closeSub!: Subscription;
  @ViewChild('appPlaceholder', {read: ViewContainerRef}) errorHost!: ViewContainerRef;
  constructor(private authService: AuthService,
              private router: Router) { }

  ngOnInit(): void {
  }

  onSignUp(){
    this.signUpClicked = !this.signUpClicked;
  }

  onSubmit(authForm: NgForm){

    let authObs: Observable<AuthResponseData>;

    if (!authForm.valid){
      return;
    }

    const email = authForm.value.email;
    const pw = authForm.value.password;
    const pw2 = authForm.value.password2;

    if (this.signUpClicked){
      //signup user
      authObs = this.authService.signupUser(email,pw);
    }else{
      //login user
      authObs = this.authService.loginUser(email,pw);
    }

    authObs.subscribe({
      next: (response) => {
        if (!this.signUpClicked){
          console.log("navi")
          this.router.navigate(['/overview']);
        }else{
          this.signUpClicked = false;
        }
        console.log(response);
      },
      error: (errorMessage) => {
        console.log(errorMessage);
        this.error = errorMessage;
        this.clearError();
        //this.showErrorAlert(this.error);
      }
    })
  }

  private clearError(){
    setTimeout(()=>{
      this.error = "";
    },3000)
  }

  private showErrorAlert(error:string){
    //Display Alert with Error Code if necessary
    const compRef = this.errorHost.createComponent(AlertComponent);
    compRef.instance.errorMessage = error;

    this.closeSub = compRef.instance.close.subscribe(()=>{
      this.closeSub.unsubscribe();
      this.errorHost.clear();
    })
  }

}
