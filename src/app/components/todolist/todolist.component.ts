import { Component, OnInit, ViewChild, TemplateRef, ViewContainerRef } from "@angular/core";
import { TaskService } from "../../services/task.service";
import { Task } from "../../../../interfaces/task";
import { v4 as uuidv4 } from "uuid";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { faEraser } from "@fortawesome/free-solid-svg-icons";

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

  public tasks:Task[] = [];
  public tasktitle:string = "";

  constructor(private _taskService: TaskService) { }

  ngOnInit(): void {
    this.receiveTasks();
  }

  addTask(){
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
    this._taskService.postTasks(newTask)
    .finally(()=>this.receiveTasks())
  }

  receiveTasks(){
    this._taskService.getTasks()
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

  removeTask(event:Task){
    if(confirm("Are you sure?")) this._taskService.deleteTasks(event)
    .then(()=>this.receiveTasks())
  }

  editTask(event:Task){
    this._taskService.patchTask(event)
    .then(()=>this.receiveTasks())
  }

}
