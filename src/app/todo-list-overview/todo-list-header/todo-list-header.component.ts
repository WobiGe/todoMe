import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { TodoListService } from '../todo-list.service';

@Component({
  selector: 'app-todo-list-header',
  templateUrl: './todo-list-header.component.html',
  styleUrls: ['./todo-list-header.component.css']
})
export class TodoListHeaderComponent implements OnInit, OnDestroy {
  user: string = "";
  listCount: number = 0;
  userSub: Subscription | undefined;
  constructor(private authService: AuthService, private todoListService: TodoListService) { }

  ngOnInit(): void {
    this.userSub = this.authService.user.subscribe(userData=>{
      this.user = userData!.email;
    })
    this.todoListService.myTodoListsChanged.subscribe((lists)=>{
      this.listCount = lists.length;
    })
  }

  onLogOut(){
    this.userSub?.unsubscribe();
    this.authService.logoutUser();
  }

  ngOnDestroy(): void {
      this.userSub?.unsubscribe();
  }
}
