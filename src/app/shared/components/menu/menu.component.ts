import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'shared-menu',
  templateUrl: './menu.component.html',
  styles: [
  ]
})
export class MenuComponent {

  public menuItems: MenuItem[] = [];

  ngOnInit() {
    //set the items of the top shared menu of the app
    this.menuItems = [
      {
        label: 'Tasks',
        icon: 'pi pi-book',
        items: [
          {
            label: 'Task List',
            icon: 'pi pi-list',
            routerLink: '/'
          },
          {
            label: 'Add task',
            icon: 'pi pi-plus-circle',
            routerLink: 'newTask'
          }
        ]
      },

    ];
  }
}