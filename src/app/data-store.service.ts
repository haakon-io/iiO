import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class DataStore{

  getTodos(){
    const todos = localStorage.getItem('todoData');
    return todos;
  }

  saveTodos(todos: any){
    localStorage.setItem('todoData', JSON.stringify(todos));
  }

  deleteAll() {
    localStorage.removeItem('todoData');
  }

}
