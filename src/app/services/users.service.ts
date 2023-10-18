import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment as env } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { regUsers } from '../interface/users';
import { Login } from '../interface/users';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  // Define the API endpoint based on the environment configuration.
  private endpoint: string = env.endPoint;
  private apiUrl: string = this.endpoint + "api/";

  constructor(private http: HttpClient) { }
  
  // Get a list of registered users.
  getList(): Observable<regUsers[]> {
    return this.http.get<regUsers[]>(`${this.apiUrl}users`);
  }

  // Get information about a specific user by their ID.
  getOne(idUser: number): Observable<regUsers> {
    return this.http.get<regUsers>(`${this.apiUrl}users/${idUser}`);
  }

  // Add a new registered user.
  add(model: regUsers): Observable<regUsers> {
    return this.http.post<regUsers>(`${this.apiUrl}users`, model);
  }

  // Update information for a specific user by their ID.
  update(idUser: number, model: regUsers): Observable<regUsers> {
    return this.http.put<regUsers>(`${this.apiUrl}users/${idUser}`, model);
  }

  // Delete a user by their ID.
  delete(idUser: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}users/${idUser}`);
  }

  // Authenticate a user by their login credentials.
  login(model: Login): Observable<string> {
    return this.http.post<string>(`${this.apiUrl}login`, model);
  }
}
