import { Component, ComponentRef, OnDestroy, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { todoListsDirective } from './todo-list-item.directive';
import { TodoListItemComponent } from './todo-list-item/todo-list-item.component';
import { TodoListItem } from './todo-list-item/todo-list-item.model';
import { TodoListService } from './todo-list.service';

@Component({
  selector: 'app-todo-list-overview',
  templateUrl: './todo-list-overview.component.html',
  styleUrls: ['./todo-list-overview.component.css'],
})
export class TodoListOverviewComponent implements OnInit, OnDestroy {
  @ViewChild(todoListsDirective, { static: true })
  todoListItems!: todoListsDirective;
  todoListComponents: ComponentRef<TodoListItem>[] = [];
  todoLists: TodoListItem[] = [];
  saving: boolean = false;
  private subscription: Subscription = new Subscription;
  constructor(private todoListService: TodoListService) {}

  ngOnInit(): void {
    this.todoListService.downloadTodoLists();
    this.subscription = this.todoListService.myTodoListsChanged.subscribe((lists)=>{
      this.todoLists = lists;
      this.createTodoListComponents();
    })
  }

  ngOnDestroy(): void {
      this.subscription.unsubscribe();
  }

  createTodoListComponents(){
    this.todoListItems.viewContainerRef.clear();
    this.todoListComponents = [];
    this.todoLists.forEach(todoList => {
      const compref = this.todoListItems.viewContainerRef.createComponent(TodoListItemComponent);
      compref.instance.title = todoList.title;
      compref.instance.todos = todoList.todos;
      compref.instance.index = this.todoListItems.viewContainerRef.indexOf(compref.hostView);
      this.todoListComponents.push(compref);
    })
  }

  onAddTodoList() {
    //Create TodoListItem Dynamically
    const compref = this.todoListItems.viewContainerRef.createComponent(TodoListItemComponent);
    compref.instance.index = this.todoListItems.viewContainerRef.indexOf(compref.hostView);
    this.todoListComponents.push(compref);
    const todoList = new TodoListItem(compref.instance.index,compref.instance.title,compref.instance.todos);
    this.todoListService.addList(todoList);
  }

  isUploading(status: boolean){
    this.saving = status;
  }
}
