import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { Router } from '@angular/router';

import { TodoService } from '../todo.service';
import { Todo } from './../todo.interface';

@Component({
  selector: 'app-edittask',
  templateUrl: './edittask.component.html',
  styleUrls: ['./edittask.component.css']
})
export class EdittaskComponent implements OnInit {

  todos: Todo[];
  displayOrNot: boolean = true;
  currentUrl: string;

  constructor(
    public dialogRef: MatDialogRef<EdittaskComponent>,
    @Inject(MAT_DIALOG_DATA) public passingData: Todo,
    private myData: TodoService,
    private router: Router
  ) { }

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
        (error: any)   => console.log(error),
        ()             => console.log('all data gets')
      );
  }

  onCancel(): void {
    this.dialogRef.close();
  }


  onUpdate(formData: any){
    this.dialogRef.close();
    let editedTodo: any = { _id: formData._id, title: formData.title, description: formData.description };
    this.myData.updateTodo(editedTodo)
      .subscribe(
        (res: Todo) => {
          this.getAllTodos();
          switch(this.currentUrl){
            case '/todos':
              this.router.navigate(['/']);
              break;
            case '/':
              this.router.navigate(['/todos']);
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
