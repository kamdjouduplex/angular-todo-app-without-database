import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { TasksComponent } from './tasks/tasks.component';
import { AddtaskComponent } from './addtask/addtask.component';

//material design modules
import {MatToolbarModule,MatMenuModule, MatButtonModule, MatIconModule, MatListModule, MatDialogModule, MatInputModule } from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule} from '@angular/forms';

//injectour service
import { TodoService } from './todo.service';
import { from } from 'rxjs';
import { EdittaskComponent } from './edittask/edittask.component';

const routes: Routes = [
  {
    path: '',
    component: TasksComponent
  },
  {
    path: 'todos',
    component: TasksComponent
  }
];

@NgModule({
  declarations: [
    AppComponent,
    ToolbarComponent,
    TasksComponent,
    AddtaskComponent,
    EdittaskComponent
  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    MatToolbarModule,
    MatButtonModule,
    MatListModule,
    MatIconModule,
    MatDialogModule,
    MatInputModule,
    BrowserAnimationsModule,
    FormsModule,
    MatMenuModule,
    HttpClientModule
  ],
  entryComponents: [AddtaskComponent, EdittaskComponent],
  providers: [TodoService],
  bootstrap: [AppComponent]
})
export class AppModule { }
