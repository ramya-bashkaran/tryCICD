import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Employee } from './employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private baseURL = "http://localhost:8080/EMS/APP/Employee";

  constructor(private httpClient: HttpClient) { }

  public getEmployeeList(): Observable<Employee[]> {
    return this.httpClient.get<Employee[]>(`${this.baseURL}`);
  }

  public getEmployeeList1(page: number): Observable<Employee[]> {
    // Construct query parameters for pagination
    const params = new HttpParams().set('page', page.toString());
    // Send GET request with query parameters
    return this.httpClient.get<Employee[]>(`${this.baseURL}`, { params });
  }

  public getEmployeeById(employeeId: string): Observable<Employee> {
    const url = `${this.baseURL}/${employeeId}`;
    return this.httpClient.get<Employee>(url);
  }

  sortEmployeesBySalaryAscending(page: number, size: number): Observable<any> {
    return this.httpClient.get(`${this.baseURL}/sorted/asc?page=${page}&size=${size}`);
  }

  sortEmployeesBySalaryDescending(page: number, size: number): Observable<any> {
    return this.httpClient.get(`${this.baseURL}/sorted/desc?page=${page}&size=${size}`);
  }
  public createEmployee(employee: Employee): Observable<any> {
    return this.httpClient.post<any>(this.baseURL, employee)
      .pipe(
        catchError(this.handleEmployeeError)
      );
  }

  public updateEmployee(employeeId: string, updatedEmployee: Employee): Observable<any> {
    const url = `${this.baseURL}/${employeeId}`;
    return this.httpClient.put<any>(url, updatedEmployee)
      .pipe(
        catchError(this.handleEmployeeError)
      );
  }

  public deleteEmployee(employeeId: string): Observable<any> {
    const url = `${this.baseURL}/${employeeId}`;
    return this.httpClient.delete<any>(url)
      .pipe(
        catchError(this.handleEmployeeError)
      );
  }

  private handleEmployeeError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'Unknown error occurred while processing the request.';
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else if (error.status === 400) {
      // Bad Request (e.g., employee with the same ID already exists)
      errorMessage = error.error;
    } else {
      // Server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }
}
