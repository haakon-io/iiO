import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import {filter} from 'rxjs/operators';
import { ConfirmDialogComponent } from 'src/app/common/confirm-dialog/confirm-dialog.component';
import { DataStore } from 'src/app/data-store.service';


@Component({
  selector: 'app-todos-list',
  templateUrl: './todos-list.component.html',
  styleUrls: ['./todos-list.component.scss']
})
export class TodosListComponent implements OnInit {

  form = this.fb.group({
    todos: this.fb.array([])
  });

  ngOnInit(){

    const fData = this.dStore.getTodos();
    if(fData){
      //load form with data
      this.form.patchValue(JSON.parse(fData));
      //parse form data so we can extract and load todos array
      const todo1 = JSON.parse(fData);
      //push todos to form array
      todo1.todos.forEach(todo => this.todos.push(this.fb.group(todo)));
  }

  }

  constructor(private fb: FormBuilder, private dStore: DataStore, private dialog: MatDialog) { }

  get todos(){
    return this.form.controls["todos"] as FormArray;
  }

  deleteTodo(index: number){
    this.todos.removeAt(index);
  }

  addTodo(){
    const todoForm = this.fb.group({
      description: ['', Validators.required],
      completed: ['false', Validators.required]
    });

    this.todos.push(todoForm);
  }

  saveAll(){
    this.dStore.saveTodos(this.form.value);
  };

  deleteAll() {
    // this.dStore.deleteAll();

console.log('deleteAll() called');
  const confirmDialog = this.dialog.open(ConfirmDialogComponent, {
    data: {
      title: 'Confirm Delete',
      message: 'Delete all Todo items?'
    }
  });
  confirmDialog.afterClosed().subscribe(result => {
    if (result === true) {
      this.dStore.deleteAll();
    }
  });
}

}
