import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { AuthService } from "../auth/auth.service";
import { TodoListItem } from "./todo-list-item/todo-list-item.model";

@Injectable({providedIn: 'root'})
export class TodoListService{
  private firebaseRtDatabase = 'https://ng-todome-default-rtdb.europe-west1.firebasedatabase.app/';
  private currentUser: string | undefined;
  private myTodoLists: TodoListItem[] = [];
  myTodoListsChanged = new Subject<TodoListItem[]>();

  constructor(private http: HttpClient, private authService: AuthService){
    this.authService.user.subscribe(user => {
      this.currentUser = user?.id;
    })
  }

  removeList(index: number){
    this.myTodoLists.splice(index,1);
    this.myTodoListsChanged.next(this.myTodoLists.slice());
  }

  addList(todoList: TodoListItem){
    this.myTodoLists.push(todoList);
    this.myTodoListsChanged.next(this.myTodoLists.slice());
  }

  updateTodoList(aTodoList: TodoListItem[]){
    this.myTodoLists = aTodoList;
    this.uploadTodoList();
  }

  uploadTodoList(){
    this.http.put<TodoListItem>(this.firebaseRtDatabase + '/' + this.currentUser + '/todoLists.json',this.myTodoLists).subscribe((res) => {
      this.myTodoListsChanged.next(this.myTodoLists.slice());
    })
  }
  downloadTodoLists(){
    this.http.get<TodoListItem[]>(this.firebaseRtDatabase + '/' + this.currentUser + '/todoLists.json').subscribe((downloadedLists)=>{
      this.myTodoLists = downloadedLists;
      this.myTodoListsChanged.next(this.myTodoLists.slice());
    });
  }

  getTodoLists(){
    return this.myTodoLists.slice();
  }
}
