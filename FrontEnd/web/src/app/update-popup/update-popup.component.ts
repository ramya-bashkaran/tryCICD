import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Employee } from '../employee';

@Component({
  selector: 'app-update-popup',
  templateUrl: './update-popup.component.html',
  styleUrls: ['./update-popup.component.css']
})
export class UpdatePopupComponent {
  updateForm: FormGroup;
  updatedEmployee!: Employee;

  constructor(
    public dialogRef: MatDialogRef<UpdatePopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { employee: Employee },
    private router: Router,
    private fb: FormBuilder
  ) {
    // Initialize the form with validation
    this.updateForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      dob: ['', Validators.required], // Date type
      department: ['', Validators.required],
      salary: ['', [Validators.required, Validators.pattern(/^\d+$/)]]
    });

    // Populate form fields with employee details if available
    if (data && data.employee) {
      this.updatedEmployee = { ...data.employee };
      this.updateForm.patchValue({
        firstName: this.updatedEmployee.firstName,
        lastName: this.updatedEmployee.lastName,
        dob: this.updatedEmployee.dob,
        department: this.updatedEmployee.department,
        salary: this.updatedEmployee.salary
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
      // Update the updatedEmployee object with form values
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
