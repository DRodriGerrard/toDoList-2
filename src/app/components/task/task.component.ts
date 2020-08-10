import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Task } from 'interfaces/task';
import { faTrash } from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.less']
})
export class TaskComponent implements OnInit {

  faTrash = faTrash;

  @Input() task:Task;
  @Output() deleteEmitter = new EventEmitter<Task>();

  constructor() { }

  ngOnInit(): void {}

  emitDelete(){
    this.deleteEmitter.emit(this.task);
  }

}
