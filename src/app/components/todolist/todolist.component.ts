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
import { Observable } from "rxjs";
import { forkJoin } from "rxjs";

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
    .finally(()=>{
      if(this.tasks != undefined){
        this.container.clear();
        this.container.createEmbeddedView(this.taskT);
      }
    })
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

}
