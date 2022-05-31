import { Component, OnInit } from '@angular/core';
import { TodoListService } from '../todo-list.service';

@Component({
  selector: 'app-todo-list-item',
  templateUrl: './todo-list-item.component.html',
  styleUrls: ['./todo-list-item.component.css']
})

export class TodoListItemComponent implements OnInit {
  index: number = 0;
  title: string = "TodoTitle";
  todos: string[] = [""];
  constructor(private todoListService: TodoListService) { }

  ngOnInit(): void {
  }

  addTodo(){
    this.todos.push("");
  }

  deleteTodo(){
    this.todoListService.removeList(this.index);
  }

  trackByIdx(index: number, obj: any): any {
    return index;
  }
}
