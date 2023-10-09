import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TasksRoutingModule } from './tasks-routing.module';
import { TasksComponent } from './pages/tasks/tasks.component';
import { EditTaskComponent } from './pages/edit-task-component/edit-task.component';
import { PrimeNgModule } from '../prime-ng/prime-ng.module';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { MaterialModule } from '../material/material.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    TasksComponent,
    EditTaskComponent
  ],
  imports: [
    CommonModule,
    TasksRoutingModule,
    MaterialModule,
    PrimeNgModule,
    ConfirmDialogModule,
    ReactiveFormsModule

  ],
  providers: [
    //needed to use the confirmation dialog from primeng
    ConfirmationService
  ]
})
export class TasksModule { }
