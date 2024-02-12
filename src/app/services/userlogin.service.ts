import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginStatus } from '../models/loginStatus';

import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class UserloginService {
  constructor(private http: HttpClient) {}
  statusUrl: string = 'http://localhost:3000/loginStatus';
  userUrl: string = 'http://localhost:3000/users';


  getLoginStatus(email: string): Observable<LoginStatus> {
    return this.http.get<LoginStatus>(`${this.statusUrl}/${email}`);
  }

  getUser(email: string): Observable<User> {
    return this.http.get<User>(`${this.userUrl}/${email}`);
  }

  postLoginStatus(loginStatus: LoginStatus): Observable<LoginStatus> {
    return this.http.post<LoginStatus>(this.statusUrl, loginStatus);
  }

  putLoginStatus(loginStatus: LoginStatus): Observable<LoginStatus> {
    return this.http.put<LoginStatus>(`${this.statusUrl}/${loginStatus.id}`, loginStatus);
  }

  postSignupUser(user:User):Observable<User>{
    return this.http.post<User>(this.userUrl,user);
  }
}
