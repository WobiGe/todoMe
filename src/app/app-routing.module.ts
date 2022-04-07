import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "./auth/auth.guard";

const appRoutes: Routes = [
  { path: '', redirectTo: '/auth', pathMatch: 'full'},
  { path: 'overview', loadChildren: () => import('./todo-list-overview/todo-list-overview.module').then(mod => mod.TodoListOverviewModule),canActivate: [AuthGuard]},
  { path: 'auth', loadChildren: () => import('./auth/auth.module').then(mod => mod.AuthModule)}
]

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes, {preloadingStrategy: PreloadAllModules})
  ],
  exports: [
    RouterModule
  ]
})

export class AppRoutingModule{}
