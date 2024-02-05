package com.example.EMS.exception;
public class EmployeeAlreadyExistException extends RuntimeException {
    public EmployeeAlreadyExistException(String id) {

        super("Employee with id " + id + " already exists");
    }

    @Override
    public String getMessage() {

        return super.getMessage();
    }
}