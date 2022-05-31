import { Component, OnInit } from '@angular/core';
import { TodoListService } from '../todo-list.service';
import { TodoListValues } from './todo-list-item.model';

@Component({
  selector: 'app-todo-list-item',
  templateUrl: './todo-list-item.component.html',
  styleUrls: ['./todo-list-item.component.css']
})

export class TodoListItemComponent implements OnInit {
  index: number = 0;
  title: string = "TodoTitle";
  todos: TodoListValues[] = [];
  constructor(private todoListService: TodoListService) { }

  ngOnInit(): void {
  }

  addTodo(){
    this.todos.push(new TodoListValues(false, ""));
  }

  deleteTodoList(){
    this.todoListService.removeList(this.index);
  }

  removeTodo(index: number){
    if(this.todos.length > 1){
      this.todos.splice(index,1);
    }
  }

  trackByIdx(index: number, obj: any): any {
    return index;
  }
}
