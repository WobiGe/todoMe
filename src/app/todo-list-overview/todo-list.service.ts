import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { TodoListItem } from "./todo-list-item/todo-list-item.model";

@Injectable({providedIn: 'root'})
export class TodoListService{
  myTodoLists: TodoListItem[] = [];
  constructor(private http: HttpClient){}

  saveTodoList(){
    this.http.put<TodoListItem>('https://ng-todome-default-rtdb.europe-west1.firebasedatabase.app/'+'/todoLists.json',this.myTodoLists).subscribe((res) => {
      console.log(res);
    })
  }

  getTodoLists(){
    return this.http.get<TodoListItem[]>('https://ng-todome-default-rtdb.europe-west1.firebasedatabase.app/'+'/todoLists.json');
  }
}
