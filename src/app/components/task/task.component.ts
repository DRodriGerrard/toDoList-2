import { Component, OnInit, Input } from '@angular/core';
import { Task } from 'interfaces/task';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.less']
})
export class TaskComponent implements OnInit {

  @Input() task:Task;

  constructor() { }

  ngOnInit(): void {
  }

}
