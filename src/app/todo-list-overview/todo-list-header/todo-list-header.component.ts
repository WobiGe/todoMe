import { Component, ComponentRef, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { TodoListItem } from '../todo-list-item/todo-list-item.model';
import { TodoListService } from '../todo-list.service';

@Component({
  selector: 'app-todo-list-header',
  templateUrl: './todo-list-header.component.html',
  styleUrls: ['./todo-list-header.component.css']
})
export class TodoListHeaderComponent implements OnInit, OnDestroy {
  user: string = "";
  listCount: number = 0;
  userSub: Subscription = new Subscription;
  listCountSub: Subscription = new Subscription;
  collapsed: boolean = true;
  @Input() todoListComponents: ComponentRef<TodoListItem>[] = [];
  @Output() isSaving = new EventEmitter<boolean>();
  constructor(private authService: AuthService, private todoListService: TodoListService) { }

  ngOnInit(): void {
    this.userSub = this.authService.user.subscribe(userData=>{
      this.user = userData!.email;
    })
    this.listCountSub = this.todoListService.myTodoListsChanged.subscribe((lists)=>{
      this.listCount = lists.length;
    })
  }

  onLogOut(){
    this.userSub.unsubscribe();
    this.listCountSub.unsubscribe();
    this.authService.logoutUser();
  }

  ngOnDestroy(): void {
      this.userSub?.unsubscribe();
      this.listCountSub.unsubscribe();
  }

  onUpdateTodoLists() {
    this.isSaving.emit(true);
    let aListArr: TodoListItem[] = [];
    this.todoListComponents.forEach(compRef=>{
        aListArr.push(new TodoListItem(compRef.instance.index,compRef.instance.title, compRef.instance.todos));
    })
    this.todoListService.updateTodoList(aListArr);
    this.todoListComponents = [];

    setTimeout(() => {
      this.isSaving.emit(false);
    }, 2000);
  }
}
