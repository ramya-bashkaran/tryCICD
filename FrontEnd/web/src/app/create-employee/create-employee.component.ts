import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Employee } from '../employee';
import { EmployeeService } from '../employee.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrl: './create-employee.component.css'
})
export class CreateEmployeeComponent {


  employee: Employee = new Employee();

  constructor(
    private employeeService: EmployeeService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {}

  onSubmit(form: NgForm): void {
    if (form.valid && this.isSalaryValid()) {
      console.log('Form submitted successfully:', this.employee);
      this.saveEmployee();
    } else {
      console.error('Form is invalid. Please check the fields.');
      this.showSnackbar('Please enter valid information in all fields.');
    }
  }

  saveEmployee() {
    this.employeeService.createEmployee(this.employee).pipe(
      catchError(error => {
        console.error('Error creating employee:', error);
        this.showSnackbar(error.error);
        return throwError(error);
      })
    ).subscribe(
      (data: any) => {
        console.log('Employee created successfully:', data);
        this.goToEmployeeList();
      }
    );
  }

  goToEmployeeList(): void {
    this.router.navigate(['/show-employee']);
  }

  private showSnackbar(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 5000, // Duration in milliseconds
    });
  }

  private isSalaryValid(): boolean {
    // Check if the salary is a valid number
    return !isNaN(Number(this.employee.salary));
  }
}
