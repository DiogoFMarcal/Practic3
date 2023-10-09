import { Component, Input, OnInit } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { Task } from '../../interfaces/task.interface';
import { ConfirmationService, Message } from 'primeng/api';

@Component({
  selector: 'task-list',
  templateUrl: './tasks.component.html',
  styles: [
  ]
})
export class TasksComponent implements OnInit {

  //array to hold the tasks that are in the TaskService
  public tasks: Task[] = [];

  constructor(private taskService: TaskService,
    private confirmationService: ConfirmationService
  ) { }

  public deleteTask(id: number) {
    this.taskService.deleteTask(id);
  }

  ngOnInit(): void {
    //on the init load the tasks from the TaskService
    this.tasks = this.taskService.tasks;

    //clear the task item from local storage because it is not needed anymore
    localStorage.removeItem('task');
  }

  //method to open the confirmation dialog presented when the user press the delete button
  confirmDeleteTask(id: number) {
    this.confirmationService.confirm({
      message: "Are you share you want to delete the selected task?",

      //branch in case the user confirms the deleting
      accept: () => {
        this.deleteTask(id);
      }
    })
  }
}