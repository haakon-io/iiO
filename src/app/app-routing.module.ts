import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { TodosListComponent } from './todo/todos-list/todos-list.component';


const routes: Routes = [
  { path: 'todos', component: TodosListComponent },
  { path: '',   redirectTo: '/todos', pathMatch: 'full' }, // redirect to `todos`
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
