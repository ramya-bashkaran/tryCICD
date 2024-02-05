import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Employee } from '../employee';
import { EmployeeService } from '../employee.service';
import { UpdatePopupComponent } from '../update-popup/update-popup.component';

@Component({
  selector: 'app-update-employee',
  templateUrl: './update-employee.component.html',
  styleUrls: ['./update-employee.component.css']
})
export class UpdateEmployeeComponent {
  employeeId!: string;
  employee: Employee = new Employee();

  constructor(
    private employeeService: EmployeeService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {}

  searchEmployee() {
    this.employeeService.getEmployeeList().subscribe(
      (data: any) => {
        console.log('Fetched Data:', data);
  
        if (data && data.content && Array.isArray(data.content)) {
          const employeeFound = data.content.find((employee: Employee) => employee.id === this.employeeId);
          console.log('Employee Found:', employeeFound);
  
          if (employeeFound) {
            this.employee = { ...employeeFound };
            console.log('Employee:', this.employee);
  
            this.openUpdatePopup();
          } else {
            this.snackBar.open('No employee exists with the provided ID', 'Dismiss', { duration: 3000 });
          }
        } else {
          console.error('Invalid data format:', data);
        }
      },
      error => {
        console.error('Error fetching employees:', error);
      }
    );
  }
  
  openUpdatePopup() {
    const dialogRef = this.dialog.open(UpdatePopupComponent, {
      data: { employee: this.employee }
    });

    dialogRef.afterClosed().subscribe((updatedEmployee: Employee) => {
      if (updatedEmployee) {
        this.updateEmployeeDetails(updatedEmployee);
      }
    });
  }

  updateEmployeeDetails(updatedEmployee: Employee) {
    this.employeeService.updateEmployee(this.employeeId, updatedEmployee)
      .subscribe(
        () => {
          // Update successful
          // Close the popup or perform any other action
          this.snackBar.open('Employee details updated successfully', 'Dismiss', { duration: 3000 });
        },
        (error) => {
          // Handle error if the update fails
          console.error('Error updating employee details:', error);
          this.snackBar.open('Error updating employee details. Please try again.', 'Dismiss', { duration: 3000 });
        }
      );
  }
}
