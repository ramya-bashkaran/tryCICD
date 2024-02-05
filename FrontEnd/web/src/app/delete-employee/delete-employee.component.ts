import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EmployeeService } from '../employee.service';



@Component({
  selector: 'app-delete-employee',
  templateUrl: './delete-employee.component.html',
  styleUrl: './delete-employee.component.css'
})
export class DeleteEmployeeComponent implements OnInit {

  employeeId!: string;

  constructor(
    private employeeService: EmployeeService,
    private router: Router,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {}

  deleteEmployee(): void {
    if (this.employeeId) {
      // Check if the employee exists
      this.employeeService.getEmployeeById(this.employeeId).subscribe(
        (data) => {
          // Show confirmation dialog
          const isConfirmed = confirm('Are you sure you want to delete this employee? This process is non-reversible!');

          if (isConfirmed) {
            // Proceed with deletion
            this.employeeService.deleteEmployee(this.employeeId).subscribe(
              () => {
                console.log('Employee deleted successfully.');
                this.snackBar.open('Employee deleted successfully.', 'Close', {
                  duration: 5000,
                });
                this.goToEmployeeList();
              },
              error => {
                console.error('Error deleting employee:', error);
                this.snackBar.open(error.error, 'Close', {
                  duration: 5000,
                });
              }
            );
          }
        }
      ,
        error => {
          console.error('Error checking if employee exists:', error);
          this.snackBar.open(error.error, 'Close', {
            duration: 5000,
          });
        }
      );
    }
   else {
      this.snackBar.open('Please provide an Employee ID.', 'Close', {
        duration: 5000,
      });
    }
  }

  goToEmployeeList(): void {
    this.router.navigate(['/show-employee']);
  }
}
