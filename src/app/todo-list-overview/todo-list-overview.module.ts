import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { TodoListOverviewComponent } from "./todo-list-overview.component";
import { TodoListItemComponent } from './todo-list-item/todo-list-item.component';
import { CommonModule } from "@angular/common";
import { TodoListHeaderComponent } from './todo-list-header/todo-list-header.component';
import { FormsModule } from "@angular/forms";
import { DynamicChildLoaderDirective } from "./todo-list-item.directive";

@NgModule({
  declarations: [
    TodoListOverviewComponent,
    TodoListItemComponent,
    TodoListHeaderComponent,
    DynamicChildLoaderDirective
  ],
    imports: [
      CommonModule,
      FormsModule,
      RouterModule.forChild([
        {path: '', component: TodoListOverviewComponent}
      ])
    ]
})
export class TodoListOverviewModule {

}
