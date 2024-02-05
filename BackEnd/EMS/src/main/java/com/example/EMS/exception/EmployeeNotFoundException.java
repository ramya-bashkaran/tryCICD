package com.example.EMS.exception;
public class EmployeeNotFoundException extends RuntimeException {
    public EmployeeNotFoundException(String id) {

        super("No employee exist with an ID: " + id);
    }
    @Override
    public String getMessage() {

        return super.getMessage();
    }
}