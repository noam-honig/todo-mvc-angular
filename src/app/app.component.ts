import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ErrorInfo, Remult } from 'remult';
import { Task } from '../shared/task';
import { TasksController } from '../shared/tasks-controller';
import { AuthService } from './AuthService';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(public remult: Remult, private http: HttpClient, private auth: AuthService) { }
  taskRepo = this.remult.repo(Task);


  username = '';
  async signIn() {
    try {
      const token = await this.http.post<string>('/api/signIn', { username: this.username }).toPromise();
      console.log(token);
      this.auth.setAuthToken(token!);
      this.loadTasks();
    }
    catch (error: any) {
      console.error(error);
      alert(error.error);
    }
  }
  signOut() {
    this.auth.setAuthToken(null);
  }

  ngOnInit(): void {
    this.loadTasks();
  }
  newTaskTitle = '';
  hideCompleted = false;
  editingTask?: Task = undefined;
  error?: ErrorInfo<Task> = undefined;
  tasks: Task[] = []
  async loadTasks() {
    this.tasks = await this.taskRepo.find({
      where: {
        completed: this.hideCompleted ? false : undefined
      }
    });
  }
  async createNewTask() {
    if (this.newTaskTitle) {
      const newTask: Task = await this.taskRepo.insert({
        id: this.tasks.length,
        title: this.newTaskTitle,
        completed: false
      });
      this.tasks.push(newTask);
      this.newTaskTitle = '';
    }
  }
  async endEditing(task: Task) {
    try {
      await this.taskRepo.save(task);
      this.editingTask = undefined;
      this.error = undefined;
    } catch (error: any) {
      this.error = error;
    }
  }
  async save(task: Task) {
    await this.taskRepo.save(task);
  }

  async deleteTask(task: Task) {
    await this.taskRepo.delete(task);
    this.tasks = this.tasks.filter(t => t != task);
  }
  async setAll(completed: boolean) {
    await TasksController.setAll(completed);
    this.loadTasks();
  }



  setHideCompleted(val: boolean) {
    this.hideCompleted = val;
    this.loadTasks();
  }
  keyDown(e: any) {
    if (e.key === 'Enter')
      this.createNewTask()
  }


  setAllChecked() {
    return this.tasks.length > 0 && this.tasks[0].completed;
  }
}
