import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment as env } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { regUsers } from '../interface/users';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private endpoint: string = env.endPoint;
  private apiUrl:string = this.endpoint + "api/";


  constructor(private http:HttpClient) { }
  
  getList():Observable<regUsers[]>{
    return this.http.get<regUsers[]>(`${this.apiUrl}users`);
  }

  getOne(idUser:number):Observable<regUsers>{
    return this.http.get<regUsers>(`${this.apiUrl}users/${idUser}`);
  }

  add(model:regUsers):Observable<regUsers>{
    return this.http.post<regUsers>(`${this.apiUrl}users`, model);
  }

  update(idUser:number, model:regUsers):Observable<regUsers>{
    return this.http.put<regUsers>(`${this.apiUrl}users/${idUser}`, model);
  }

  delete(idUser:number):Observable<void>{
    return this.http.delete<void>(`${this.apiUrl}users/${idUser}`);
  }
}
