import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Employee } from '../employee';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-update-popup',
  templateUrl: './update-popup.component.html',
  styleUrls: ['./update-popup.component.css']
})
export class UpdatePopupComponent {

  updateForm!: FormGroup;
  updatedEmployee!: Employee;

  constructor(
    public dialogRef: MatDialogRef<UpdatePopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { employee: Employee },
    private router: Router,
    private fb: FormBuilder
  ) {
    if (data && data.employee) {
      this.updatedEmployee = { ...data.employee };

      // Initialize the form with validation
      this.updateForm = this.fb.group({
        firstName: [this.updatedEmployee.firstName, Validators.required],
        lastName: [this.updatedEmployee.lastName, Validators.required],
        dob: [this.updatedEmployee.dob, Validators.required], // Keep using the Date type here
        department: [this.updatedEmployee.department, Validators.required],
        salary: [this.updatedEmployee.salary, [Validators.required, Validators.pattern(/^\d+$/)]]
      });
    } else {
      console.error('Invalid data format:', data);
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onUpdateClick(): void {
    if (this.updateForm.valid) {
      this.updatedEmployee = { ...this.updateForm.value };

      // Log the updated employee data
      console.log('Updated Employee:', this.updatedEmployee);

      // You can perform an HTTP request to update the employee on the server
      // For example: this.employeeService.updateEmployee(this.updatedEmployee.id, this.updatedEmployee).subscribe();

      // Navigate to the employee list page after updating
      this.router.navigate(['/show-employee']);

      // Close the dialog after updating
      this.dialogRef.close(this.updatedEmployee);
    }
  }
}
