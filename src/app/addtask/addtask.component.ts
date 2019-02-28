import { Component, OnInit} from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { Router } from '@angular/router';

import { TodoService } from '../todo.service';
import { Todo } from './../todo.interface';



@Component({
  selector: 'app-addtask',
  templateUrl: './addtask.component.html',
  styleUrls: ['./addtask.component.css']
})
export class AddtaskComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<AddtaskComponent>,
    private myData: TodoService,
    private router: Router,
  ){}

  todos: Todo[];
  displayOrNot: boolean = true;
  currentUrl: string;

  ngOnInit() {
    this.currentUrl = this.router.url;
  }

  getAllTodos(){
    this.myData.getTodos()
      .subscribe(
        (data: Todo[]) =>  {
        this.todos = data;
        if(this.todos.length > 0)
          this.displayOrNot = false;
        else
          this.displayOrNot = true;
        },
        (error: any) => console.log(error),
        () => console.log('all data gets')
      );
  }

  onCancel(): void {
    this.dialogRef.close();
  }
    
  onSave(formData: any){
    this.dialogRef.close();

    let newTodo: any = { title: formData.title, description: formData.description };
    this.myData.addTodo(newTodo)
      .subscribe(
        (resp: Todo) => {
          this.getAllTodos();
          switch(this.currentUrl){
            case '/':
              this.router.navigate(['/todos']);
              break;
            case '/todos':
              this.router.navigate(['/']);
              break;
            default:
              this.router.navigate(['/']);
              break;
          }
        },
          (error) => console.log(error)
        );
  }

}


