import { Injectable } from "@angular/core";
import { HttpClient } from  "@angular/common/http";
import { Task } from 'interfaces/task';

@Injectable({
  providedIn: "root"
})
export class TaskService {

  private httpURL = "http://localhost:3000/tasks";

  constructor(private _httpClient: HttpClient) {}

  public httpError(error){
    console.log("Promise rejected with " + JSON.stringify(error.statusText+" "+error.status));
    console.log("in " + JSON.stringify(error.url));
    console.log("Name: " + JSON.stringify(error.name));
    console.log(JSON.stringify(error.error));
  }

  public getTasks() {
    return this._httpClient.get<Task[]>(this.httpURL)
    .toPromise()
    .then((data) => data)
    .catch((error) => {
      this.httpError(error);
    });
  }

  public postTasks(newTask) {
    return this._httpClient.post<Task>(this.httpURL, newTask)
    .toPromise()
    .then(() => {
      alert("new task added successfully!");
    })
    .catch((error) => {
      this.httpError(error);
    });
  }
}
