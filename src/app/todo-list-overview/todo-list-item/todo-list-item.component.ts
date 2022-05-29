import { Component, OnInit } from '@angular/core';
import { TodoListService } from '../todo-list.service';
import { TodoListItem } from './todo-list-item.model';

@Component({
  selector: 'app-todo-list-item',
  templateUrl: './todo-list-item.component.html',
  styleUrls: ['./todo-list-item.component.css']
})

export class TodoListItemComponent implements OnInit {
  title: string = "TodoTitle";
  todos: string[] = [""];
  constructor() { }

  ngOnInit(): void {
  }

  addTodo(){
    this.todos.push("");
  }
  trackByIdx(index: number, obj: any): any {
    return index;
  }
}
