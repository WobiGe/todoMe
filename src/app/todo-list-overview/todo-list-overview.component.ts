import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { TodoListItem } from './todo-list-item/todo-list-item.model';

@Component({
  selector: 'app-todo-list-overview',
  templateUrl: './todo-list-overview.component.html',
  styleUrls: ['./todo-list-overview.component.css']
})
export class TodoListOverviewComponent implements OnInit {
  todoLists: TodoListItem[] = [
    new TodoListItem(123,"Titel",["Zeile 1", "Zeile 2", "Zeile 3"]),
    new TodoListItem(124,"Titel2",["Zeile 2", "Zeile 6", "Zeile 1"]),
    new TodoListItem(124,"Titel2",["Satz", "Pimmel", "Glutexo"]),
  ];

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  onLogout(){
    this.authService.logoutUser();
  }



}
