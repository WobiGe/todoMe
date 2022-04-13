import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { TodoListOverviewComponent } from "./todo-list-overview.component";
import { TodoListItemComponent } from './todo-list-item/todo-list-item.component';
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

@NgModule({
  declarations: [
    TodoListOverviewComponent,
    TodoListItemComponent
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
