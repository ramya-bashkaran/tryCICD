package com.example.EMS.service;
import com.example.EMS.exception.EmployeeAlreadyExistException;
import com.example.EMS.exception.EmployeeNotFoundException;
import com.example.EMS.model.Employee;
import com.example.EMS.model.EmployeeState;
import com.example.EMS.repository.EmployeeRepository;
import com.example.EMS.repository.EmployeeStateRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.Optional;
import java.util.concurrent.atomic.AtomicLong;


@Service
public class EmployeeService {

    private final EmployeeRepository repository;
    private final AtomicLong counter = new AtomicLong(0);

    @Autowired
    private EmployeeStateRepository employeeStateRepository;

    @Autowired
    public EmployeeService(EmployeeRepository repository, EmployeeStateRepository employeeStateRepository) {
        this.repository = repository;
        this.employeeStateRepository = employeeStateRepository;
        initializeCounter();
    }

    private void initializeCounter() {
        EmployeeState state = employeeStateRepository.findById(STATE_ID).orElse(new EmployeeState());
        counter.set(state.getLastAssignedId());
    }

    public Employee create(Employee employee) {
        // Generate employee ID
        String generatedId = generateEmployeeId();
        employee.setId(generatedId);

        // Check if the generated ID already exists
        if (repository.existsById(employee.getId())) {
            throw new EmployeeAlreadyExistException(employee.getId());
        }

        return repository.save(employee);
    }

    public Optional<Employee> findById(String id) {
        Optional<Employee> employee = repository.findById(id);

        if (employee.isEmpty()) {
            throw new EmployeeNotFoundException(id);
        }

        return employee;
    }

    public Iterable<Employee> findAll() {
        return repository.findAll();
    }

    public Employee update(String id, Employee employee) {
        if (!repository.existsById(id)) {
            throw new EmployeeNotFoundException(id);
        }

        employee.setId(id);
        return repository.save(employee);
    }

    public void delete(String id) {
        if (!repository.existsById(id)) {
            throw new EmployeeNotFoundException(id);
        }

        repository.deleteById(id);
        updateCounter();
    }

    public void deleteAll() {
        repository.deleteAll();
        updateCounter();  // Update the counter after deleting all records
    }

    private void updateCounter() {
        long lastAssignedId = counter.get();
        EmployeeState state = employeeStateRepository.findById(STATE_ID).orElse(new EmployeeState());
        state.setLastAssignedId(lastAssignedId);
        employeeStateRepository.save(state);
    }

    private String generateEmployeeId() {
        String generatedId;
        do {
            // Increment the counter and format it
            long nextId = counter.incrementAndGet();
            generatedId = "SAG" + String.format("%05d", nextId);
        } while (repository.existsById(generatedId)); // Check existence in repository

        return generatedId;
    }

    private static final String STATE_ID = "EMPLOYEE_STATE";
}