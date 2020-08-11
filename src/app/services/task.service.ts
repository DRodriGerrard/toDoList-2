import { Injectable } from "@angular/core";
import { HttpClient } from  "@angular/common/http";
import { Task } from "interfaces/task";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class TaskService {

  private httpURL = "http://localhost:3000/tasks";

  public result$: Observable<Task[]>;

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

  public postTasks(newTask:Task) {
    return this._httpClient.post<Task>(this.httpURL, newTask)
    .toPromise()
    .then(() => {
      alert("new task added successfully!");
    })
    .catch((error) => {
      this.httpError(error);
    });
  }

  public deleteTask(task:Task) {
    return this._httpClient.delete<Task>(this.httpURL+"/"+task.id)
    .toPromise()
    .catch((error) => {
      this.httpError(error);
    });
  }

  public patchTask(task:Task) {
    return this._httpClient.patch<Task>(this.httpURL+'/'+task.id, task)
    .toPromise()
    .then(() => {
      alert("task updated successfully!");
    })
    .catch((error) => {
      this.httpError(error);
    });
  }

  public deleteAllTasks(tasksID:string[]){
    console.log(tasksID);
    const promises = [];
    tasksID.forEach(taskId =>{
      promises.push(this._httpClient.delete(this.httpURL+"/"+taskId).toPromise())
    })
    return Promise.all(promises)
    .then(()=> alert("All tasks deleted sucefully!"))
    .catch((error) => {
      console.log("puta mierda");
      this.httpError(error);
    });
  }
}
