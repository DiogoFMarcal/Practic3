import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TasksComponent } from './pages/tasks/tasks.component';
import { EditTaskComponent } from './pages/edit-task-component/edit-task.component';


//routes of the task application
const routes: Routes = [
  {
    path: '',
    component: TasksComponent
  },
  {
    path: 'editTask/:id',
    component: EditTaskComponent
  },
  {
    path: 'newTask',
    component: EditTaskComponent
  },
  
  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TasksRoutingModule { }
