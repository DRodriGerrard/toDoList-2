import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Task } from 'interfaces/task';
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.less']
})
export class TaskComponent implements OnInit {

  faTrash = faTrash;
  faEdit = faEdit;
  faPlus = faPlus;
  faCheck = faCheck;

  @Input() task:Task;
  @Output() deleteEmitter = new EventEmitter<Task>();
  @Output() editEmitter = new EventEmitter<Task>();

  public editable:boolean = false;
  public completed:boolean = false;

  constructor() { }

  ngOnInit(): void {}

  emitDelete(){
    this.deleteEmitter.emit(this.task);
  }

  handlerEdit(){
    if(!this.editable) this.editable = true;
    else {
      this.editable = false;
      this.editEmitter.emit(this.task);
    }
  }

  handlerComplete(){
    if(!this.task.completed) this.task.completed = true;
    else this.task.completed = false;
    this.editEmitter.emit(this.task);
  }

}
