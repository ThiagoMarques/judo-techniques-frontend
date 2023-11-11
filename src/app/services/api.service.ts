// api.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  baseUrl: string = 'https://judo-techniques-production.up.railway.app';
  endpoint = 'judothrows';

  constructor(private http: HttpClient) { }

  // GET
  getThrows(): Observable<any> {
    return this.http.get(`${this.baseUrl}/${this.endpoint}`);
  }

  getThrowId(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${this.endpoint}/${id}`);
  }

  // POST
  postThrow(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/${this.endpoint}`, data);
  }

  // PUT
  putThrow(id: number, data: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/${this.endpoint}/${id}`, data);
  }

  // DELETE
  delete(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${this.endpoint}/${id}`);
  }
}
