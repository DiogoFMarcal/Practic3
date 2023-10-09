import { Component, OnDestroy, OnInit } from '@angular/core';
import { Task } from '../../interfaces/task.interface';
import { TaskService } from '../../services/task.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subject, debounceTime } from 'rxjs';

@Component({
  selector: 'details-task-page',
  templateUrl: './edit-task.component.html',
  styles: [],
})
export class EditTaskComponent implements OnInit, OnDestroy {
  //this component can create and update a task

  //taskForm definition
  public taskForm = new FormGroup({
    id: new FormControl<number>(0, Validators.required),
    name: new FormControl<string>('', [Validators.required, Validators.minLength(10)]),
    completed: new FormControl<boolean>(false),
  });

  constructor(
    private taskService: TaskService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  get currTask(): Task {
    const task = this.taskForm.value as Task;
    return task;
  }

  ngOnInit(): void {

    if (this.router.url.includes('edit') && !localStorage.getItem('task')) {
      //if it is to edit a task and there is no task in localstorage we will fetch the task from the service array that contains all the saved tasks

      //get the id of the selected task to edit
      this.activatedRoute.params.subscribe(({ id }) => {

        const idNumber: number = id;
        const task = this.taskService.getTaskById(idNumber);
        

        if (!task || task.completed) {
          //if the task doesnt exists or if it is already completed we should not be able to edit the task so
          //return to the list of all tasks
          return this.router.navigateByUrl('/');
        }

        //set the form data to the fecthed task
        this.taskForm.reset(task!);
        return;
      });

    } else if(this.router.url.includes('new')) {
      //if the task is new we will check if there is any task data in localstorage
      /*this is part of the requirement that says that if i am creating a task and i refresh the browser tab
      my app should be able to recover the data that was in the form berfore the refresh*/

      if (localStorage.getItem('task')) {

        //get the localstorage data of a task that was not saved before refreshing the browser
        const taskInLocalStorage = JSON.parse(localStorage.getItem('task')!);

        //set the form value to the fetched task from localstorage
        this.taskForm.reset(taskInLocalStorage);

      }

    }
  }

  onSubmit() {

    if (this.taskForm.invalid) {
      this.taskForm.markAllAsTouched();
      return;
    }

    if (this.currTask.id) {
      //if the task was already an id that mens that the action should be to update it

      this.taskService.editTask(this.currTask.id, this.currTask);

    } else {
      this.taskService.addTask(this.currTask);
    }
    return this.router.navigateByUrl('/');

  }

  checkNameFieldIsValid() {
    return this.taskForm.controls['name'].errors && this.taskForm.controls['name'].touched;
  }

  getNameFieldError(): string | null {
    if (!this.taskForm.controls['name']) return null;

    const errors = this.taskForm.controls['name'].errors || {};

    for (const key of Object.keys(errors)) {
      switch (key) {
        case 'required':
          return '* Required field';
        case 'minlength':
          return `* This field requires a minimum of ${errors['minlength'].requiredLength} characters`;
      }
    }
    return '';
  }

  saveTaskOnLocalStorage() {
    //when the name or completed inputs change, the curr data in form is saved in local storage
    localStorage.setItem('task', JSON.stringify(this.taskForm.value));
  }

  ngOnDestroy(): void {
    //clear the task item from localstorage since it is not needed anymore
    localStorage.removeItem('task');
  }
}
