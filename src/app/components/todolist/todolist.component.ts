import { Component, OnInit } from "@angular/core";
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
    this._taskService.postTasks(newTask).finally(()=>this.receiveTasks())
  }

  receiveTasks(){
    this._taskService.getTasks().then((data:Task[])=>this.tasks = data)
  }

}
