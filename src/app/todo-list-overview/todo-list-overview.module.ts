import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { TodoListOverviewComponent } from "./todo-list-overview.component";

@NgModule({
  declarations: [
    TodoListOverviewComponent
  ],
    imports: [
      RouterModule.forChild([
        {path: '', component: TodoListOverviewComponent}
      ])
    ]
})
export class TodoListOverviewModule {

}
