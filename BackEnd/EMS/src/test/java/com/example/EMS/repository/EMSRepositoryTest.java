package com.example.EMS.repository;
import com.example.EMS.model.Employee;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.data.elasticsearch.DataElasticsearchTest;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

@DataElasticsearchTest
public class EMSRepositoryTest {

    @Autowired
    private EmployeeRepository employeeRepository;

    private Employee testEmployee;

    @BeforeEach
    void setup() {
        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");

        Date dob = null;
        try {
            dob = dateFormat.parse("1998-02-15");
        } catch (ParseException e) {
            e.printStackTrace();
        }
        String employeeId = "SAG12345";
        testEmployee = new Employee("Sakthi", "A S", dob, "Administration", 60000.0);
        testEmployee.setId(employeeId); // Manually set the ID
        employeeRepository.save(testEmployee);
    }

    @AfterEach
    void tearDown() {

        employeeRepository.deleteById(testEmployee.getId());
    }

    @Test
    void testFindById() {
        // Retrieve the employee by ID
        Employee retrievedEmployee = employeeRepository.findById("SAG12345").orElse(null);
        assertNotNull(retrievedEmployee);


        String expectedDate = "1998-02-15";

        // Format the actual date string
        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
        String actualDate = dateFormat.format(retrievedEmployee.getDob());

        // Assert that the retrieved employee has the expected values
        assertEquals("Sakthi", retrievedEmployee.getFirstName());
        assertEquals(expectedDate, actualDate);
        assertEquals("A S", retrievedEmployee.getLastName());
        assertEquals("Administration", retrievedEmployee.getDepartment());
        assertEquals(60000.0, retrievedEmployee.getSalary());
        System.out.println("testFindById successful!");
    }

    @Test
    void testUpdateEmployee() {

        Employee retrievedEmployee = employeeRepository.findById("SAG12345").orElse(null);


        assertNotNull(retrievedEmployee);

        // Update the department of the retrieved employee
        retrievedEmployee.setDepartment("HR");
        employeeRepository.save(retrievedEmployee);


        Employee updatedEmployee = employeeRepository.findById("SAG12345").orElse(null);


        assertNotNull(updatedEmployee);
        assertEquals("HR", updatedEmployee.getDepartment());
        System.out.println("testUpdateEmployee successful!");
    }
}
