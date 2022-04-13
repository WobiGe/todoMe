import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-todo-list-header',
  templateUrl: './todo-list-header.component.html',
  styleUrls: ['./todo-list-header.component.css']
})
export class TodoListHeaderComponent implements OnInit, OnDestroy {
  user: string = "";
  listCount: number = 0;
  userSub: Subscription | undefined;
  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.userSub = this.authService.user.subscribe(userData=>{
      this.user = userData!.email;
    })
  }

  onLogOut(){
    this.authService.logoutUser();
  }

  ngOnDestroy(): void {
      this.userSub?.unsubscribe();
  }
}
