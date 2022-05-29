import { Component, ComponentRef, OnInit, ViewChild } from '@angular/core';
import { DynamicChildLoaderDirective } from './todo-list-item.directive';
import { TodoListItemComponent } from './todo-list-item/todo-list-item.component';
import { TodoListItem } from './todo-list-item/todo-list-item.model';
import { TodoListService } from './todo-list.service';

@Component({
  selector: 'app-todo-list-overview',
  templateUrl: './todo-list-overview.component.html',
  styleUrls: ['./todo-list-overview.component.css'],
})
export class TodoListOverviewComponent implements OnInit {
  @ViewChild(DynamicChildLoaderDirective, { static: true })
  todoListItems!: DynamicChildLoaderDirective;
  myTodoListsCfr: ComponentRef<TodoListItemComponent>[] = [];
  constructor(private todoListService: TodoListService) {}

  ngOnInit(): void {
    let fetchedLists: TodoListItem[] = [];
    this.todoListService.getTodoLists().subscribe((res) => {
      fetchedLists = res;
      for (let index = 0; index < fetchedLists.length; index++) {
        const compRef = this.todoListItems.viewContainerRef.createComponent(
          TodoListItemComponent
        );
        compRef.instance.title = fetchedLists[index].title;
        compRef.instance.todos = fetchedLists[index].todos;
        this.myTodoListsCfr.push(compRef);
      }
    });
  }

  onAddTodoList() {
    //Create TodoListItem Dynamically
    const compRef = this.todoListItems.viewContainerRef.createComponent(
      TodoListItemComponent
    );
    this.myTodoListsCfr.push(compRef);
  }

  onSaveTodoLists() {
    this.todoListService.myTodoLists = [];
    for (let index = 0; index < this.myTodoListsCfr.length; index++) {
      this.myTodoListsCfr[index].changeDetectorRef.detectChanges();
      this.todoListService.myTodoLists.push(
        new TodoListItem(
          this.myTodoListsCfr[index].instance.title,
          this.myTodoListsCfr[index].instance.todos
        )
      );
    }
    this.todoListService.saveTodoList();
  }
}
