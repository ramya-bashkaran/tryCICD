import { Component , OnInit} from '@angular/core';
import { Employee } from '../employee';
import { EmployeeService } from '../employee.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-show-employee',
  templateUrl: './show-employee.component.html',
  styleUrl: './show-employee.component.css'
})
export class ShowEmployeeComponent implements OnInit{

  employees: Employee[] = [];
  currentPage = 0;
  selectedSortCategory: string = 'salaryAsc';
  constructor(private employeeService: EmployeeService, private router: Router) {}

  ngOnInit(): void {
    this.getEmployees(0);
  }

  
  private getEmployees(page: number) {
    let sortMethod: Observable<Employee[]>;
    if (this.selectedSortCategory === 'salaryAsc') {
      sortMethod = this.employeeService.sortEmployeesBySalaryAscending(page, 10);
    } else if (this.selectedSortCategory === 'salaryDesc') {
      sortMethod = this.employeeService.sortEmployeesBySalaryDescending(page, 10);
    } else {
      sortMethod = this.employeeService.getEmployeeList1(page);
    }
  
    sortMethod.subscribe(
      (data: any) => {
        if (data && data.content && Array.isArray(data.content)) {
          this.employees = data.content;
        } else {
          console.error('Invalid data format:', data);
        }
      },
      error => {
        console.error('Error fetching employees:', error);
      }
    );
  }
  sortEmployeesBySelectedCategory(page: number = 0, size: number = 10) {
    if (this.selectedSortCategory === 'salaryAsc') {
      this.employeeService.sortEmployeesBySalaryAscending(page, size).subscribe(
        (data: any) => {
          if (data && Array.isArray(data.content)) {
            this.employees = data.content;
          } else {
            console.error('Invalid data format:', data);
          }
        },
        error => {
          console.error('Error sorting employees:', error);
        }
      );
    } else if (this.selectedSortCategory === 'salaryDesc') {
      this.employeeService.sortEmployeesBySalaryDescending(page, size).subscribe(
        (data: any) => {
          if (data && Array.isArray(data.content)) {
            this.employees = data.content;
          } else {
            console.error('Invalid data format:', data);
          }
        },
        error => {
          console.error('Error sorting employees:', error);
        }
      );
    }
  }
  
  
  
  getNextPage() {
    this.currentPage++; // Increment current page number
    this.getEmployees(this.currentPage); // Fetch employees for the next page
  }

  getPreviousPage() {
    if (this.currentPage > 0) {
      this.currentPage--; // Decrement current page number
      this.getEmployees(this.currentPage); // Fetch employees for the previous page
    }
  }
}