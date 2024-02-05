import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../employee.service';
import { Employee } from '../employee';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { CustomSnackbarComponent } from '../custom-snackbar/custom-snackbar.component';

@Component({
  selector: 'app-search-employee',
  templateUrl: './search-employee.component.html',
  styleUrls: ['./search-employee.component.css']
})
export class SearchEmployeeComponent implements OnInit {

  employee$!: Observable<Employee | undefined>;

  employeeId: string = '';
  employee: Employee | undefined;
  error: string | undefined;

  constructor(private employeeService: EmployeeService, private snackBar: MatSnackBar) {}

  ngOnInit(): void {}
  searchEmployee(): void {
    this.employeeService.getEmployeeById(this.employeeId).subscribe(
      (data: Employee) => {
        if (data) {
          this.openCustomSnackBar(data);
        } else {
          this.openDefaultSnackBar('Employee not found');
        }
      },
      error => {
        console.error('Error fetching employee:', error);
        this.openDefaultSnackBar('No employee exists');
      }
    );
  }
  
  openCustomSnackBar(data: Employee): void {
    this.snackBar.openFromComponent(CustomSnackbarComponent, {
      data: data,
      duration: 5000,
      panelClass: ['custom-snackbar'] // Add a custom CSS class for styling
    });
  }
  
  openDefaultSnackBar(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 5000,
    });
  }
}