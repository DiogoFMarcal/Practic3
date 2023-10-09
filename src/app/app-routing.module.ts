import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//load of children paths from TasksModule
const routes: Routes = [{ path: '', loadChildren: () => import('./tasks/tasks.module').then(m => m.TasksModule) }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
