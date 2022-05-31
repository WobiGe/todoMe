export class TodoListItem{
  constructor(public index: number, public title: string, public todos: TodoListValues[]){}
}

export class TodoListValues{
  constructor(public checked: string|boolean, public todoString: string){
  }
}
