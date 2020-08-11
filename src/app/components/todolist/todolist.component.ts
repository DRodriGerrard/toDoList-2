import { Component, OnInit, ViewChild, TemplateRef, ViewContainerRef } from "@angular/core";
import { TaskService } from "../../services/task.service";
import { Task } from "../../../../interfaces/task";
import { v4 as uuidv4 } from "uuid";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { faEraser } from "@fortawesome/free-solid-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { faEyeSlash } from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: "app-todolist",
  templateUrl: "./todolist.component.html",
  styleUrls: ["./todolist.component.less"]
})

export class TodolistComponent implements OnInit {

  @ViewChild(TemplateRef,{static:false}) taskT:TemplateRef<Task>;
  @ViewChild(TemplateRef,{static:false, read:ViewContainerRef}) container:ViewContainerRef;

  faPlus = faPlus;
  faEraser = faEraser;
  faTrash = faTrash;
  faCheck = faCheck;
  faEye = faEye;
  faEyeSlash = faEyeSlash;

  public tasks:Task[] = [];
  public tasktitle:string = "";

  public allCompleted:boolean = false;
  public hidde:boolean = false;
  public hidden:boolean = false;

  constructor(private _taskService: TaskService) { }

  ngOnInit(): void {
    this.receiveTasks();
  }

  async addTask(){
    const newDate = new Date();
    const finalDate = newDate.getFullYear()+"-"+newDate.getMonth()+"-"+newDate.getDate()+" at "
    + newDate.getHours()+":"+newDate.getMinutes()+":"+newDate.getSeconds();

    const newTask:Task = {
      id: uuidv4(),
      title: this.tasktitle,
      completed: false,
      hidden: false,
      created: finalDate
    }
    this.tasktitle = "";
    await this._taskService.postTasks(newTask)
    .finally(()=>this.receiveTasks())
  }

  async receiveTasks(){
    await this._taskService.getTasks()
    .then((data:Task[])=>{
      this.tasks = data
    })
    .then(()=>{
      if(this.tasks != undefined){
        this.container.clear();
        this.container.createEmbeddedView(this.taskT);
      }
    })
    .finally(()=>this.reviseTasks())
  }

  private reviseTasks(){
    if(this.tasks.every(task => task.completed)) this.allCompleted = true;
    else this.allCompleted = false;
    if (this.tasks.some(task => task.completed)) this.hidde = true;
    else this.hidde = false;
    if (this.tasks.some(task => task.hidden)) this.hidden = true;
    else this.hidden = false;
  }

  async removeTask(event:Task){
    await this._taskService.deleteTask(event)
    .then(()=>this.receiveTasks())
  }

  async editTask(event:Task){
    await this._taskService.patchTask(event)
    .then(()=>this.receiveTasks())
  }

  async removeAllTasks(){
    if(confirm("Are you sure do you want to delete all your tasks?")){
      const arrID = [];
      this.tasks.forEach(task=>{
        arrID.push(task.id)
      })
      await this._taskService.deleteAllTasks(arrID)
      .finally(()=>this.receiveTasks())
    } 
  }

  /*async editAllTasks(){
    this.tasks.forEach((task:Task)=>{
      if(!task.completed) task.completed = true;
      else task.completed = false;
    })
    await this._taskService.patchAllTasks(this.tasks)
    .finally(()=>this.receiveTasks())
  }*/

  async editAllTasks(){
    if(this.allCompleted === false) {
      this.allCompleted = true;
      this.tasks.forEach(async task => {
        task.completed = true;
      })
      this._taskService.patchAllTasks(this.tasks)
      .finally( () => this.receiveTasks())
    }
    else {
      this.allCompleted = false;
      this.tasks.forEach(async task => {
        task.completed = false;
      })
      this._taskService.patchAllTasks(this.tasks)
      .finally( () => this.receiveTasks())
    }
  }

  async hiddeCompleted(){
    this.tasks.forEach((task:Task)=>{
      if(task.completed) task.hidden = true;
    })
    await this._taskService.patchAllTasks(this.tasks)
    .finally(()=>this.receiveTasks())
  }

  async showCompleted(){
    this.tasks.forEach((task:Task)=> task.hidden = false)
    await this._taskService.patchAllTasks(this.tasks)
    .finally(()=>this.receiveTasks())
  }

}
