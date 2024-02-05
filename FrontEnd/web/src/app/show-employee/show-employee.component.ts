import { Component , OnInit} from '@angular/core';
import { Employee } from '../employee';
import { EmployeeService } from '../employee.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-show-employee',
  templateUrl: './show-employee.component.html',
  styleUrl: './show-employee.component.css'
})
export class ShowEmployeeComponent implements OnInit{

  employees: Employee[] = [];
 
  constructor(private employeeService: EmployeeService, private router: Router) {}

  ngOnInit(): void {
    this.getEmployees();
  }

  
  private getEmployees() {
    this.employeeService.getEmployeeList().subscribe(
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

  
}