import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { TodoListOverviewComponent } from "./todo-list-overview.component";
import { TodoListItemComponent } from './todo-list-item/todo-list-item.component';
import { CommonModule } from "@angular/common";
import { TodoListHeaderComponent } from './todo-list-header/todo-list-header.component';

@NgModule({
  declarations: [
    TodoListOverviewComponent,
    TodoListItemComponent,
    TodoListHeaderComponent
  ],
    imports: [
      CommonModule,
      RouterModule.forChild([
        {path: '', component: TodoListOverviewComponent}
      ])
    ]
})
export class TodoListOverviewModule {

}
