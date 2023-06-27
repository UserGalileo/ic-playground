import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Todo } from '../features/todos/todo-list.component';
import { environment as env } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TodosService {

  constructor(private http: HttpClient) {}

  getTodos() {
    return this.http.get<Todo[]>(`${env.apiUrl}/todos`);
  }

  addTodo(todo: Omit<Todo, 'id'>) {
    return this.http.post<Todo>(`${env.apiUrl}/todos`, todo);
  }

  deleteTodo(id: string) {
    return this.http.delete(`${env.apiUrl}/todos/${id}`);
  }

  updateTodo(id: string, todo: Partial<Todo>) {
    return this.http.put<Todo>(`${env.apiUrl}/todos/${id}`, todo);
  }
}
