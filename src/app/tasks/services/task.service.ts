import { Injectable } from '@angular/core';
import { Task } from '../interfaces/task.interface';

@Injectable({
  providedIn: 'root'
})
export class TaskService {


  public tasks: Task[] = [
    {
      id: 1,
      name: 'Go to the mechanic',
      completed: false
    },
    {
      id: 2,
      name: 'Dentist appointment',
      completed: true
    },
    {
      id: 3,
      name: 'Do the laundry',
      completed: false
    },
    {
      id: 4,
      name: 'Buy groceries for Halloween party',
      completed: false
    },
    {
      id: 5,
      name: 'Read a the computer science book',
      completed: false
    },
    {
      id: 6,
      name: 'Write a report about machine learning',
      completed: true
    },
    {
      id: 7,
      name: 'Help John with his science project',
      completed: false
    },
    {
      id: 8,
      name: 'Call dad to schedule vacations',
      completed: false
    },
    {
      id: 9,
      name: 'Pay telecomunication bills',
      completed: true
    },
    {
      id: 10,
      name: 'Go for a walk on a sunny day',
      completed: false
    }
  ];
  
  
  

  constructor() { }

  public addTask(task: Task) {
    const nextAvailableId: number = this.tasks.length + 1;

    task.id = nextAvailableId;
    this.tasks.push(task);
  }

  public deleteTask(id: number): void {
    let taskWithIdwasFound: boolean = false;

    this.tasks.forEach((task) => {
      if (task.id == id && !taskWithIdwasFound) {
        const index = this.tasks.indexOf(task);
        if (index != -1) {
          taskWithIdwasFound = true;
          this.tasks.splice(index, 1);
        }
      }
    });
  }

  public editTask(idOfTaskToEdit: number, taskToEdit: Task): void {
    let taskWithIdwasFound: boolean = false;

    this.tasks.forEach((task) => {
      if (task.id == idOfTaskToEdit && !taskWithIdwasFound) {
        const index = this.tasks.indexOf(task);

        if (index != -1) {

          taskWithIdwasFound = true;
          this.tasks[index].name = taskToEdit.name;
          this.tasks[index].completed = taskToEdit.completed;
          this.tasks[index].id = idOfTaskToEdit;

        }
      }
    });
  }

  getTaskById(id: number): Task | null {
    for (const task of this.tasks) {
      if (task.id == id) {
        return task;
      }
    }
    return null;
  }
}
