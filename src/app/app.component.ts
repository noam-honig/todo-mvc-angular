import { Component } from '@angular/core';
import { Task } from './task';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  newTaskTitle = '';
  hideCompleted = false;
  editingTask?: Task = undefined;
  tasks: Task[] = [
    { id: 1, title: "Setup", completed: true },
    { id: 2, title: "Entities", completed: false },
    { id: 3, title: "Paging, Sorting and Filtering", completed: false },
    { id: 4, title: "CRUD Operations", completed: false },
    { id: 5, title: "Validation", completed: false },
    { id: 6, title: "Backend methods", completed: false },
    { id: 7, title: "Database", completed: false },
    { id: 8, title: "Authentication and Authorization", completed: false },
    { id: 9, title: "Deployment", completed: false }
  ]
  createNewTask() {
    if (this.newTaskTitle) {
      const newTask: Task = {
        id: this.tasks.length,
        title: this.newTaskTitle,
        completed: false
      };
      this.tasks.push(newTask);
      this.newTaskTitle = '';
    }
  }

  deleteTask(task: Task) {
    this.tasks = this.tasks.filter(t => t != task);
  }
  setAll(completed: boolean) {
    for (const task of this.tasks) {
      task.completed = completed;
    }
  }



  setHideCompleted(val: boolean) {
    this.hideCompleted = val;
  }
  keyDown(e: any) {
    if (e.key === 'Enter')
      this.createNewTask()
  }


  setAllChecked() {
    return this.tasks.length > 0 && this.tasks[0].completed;
  }
}
