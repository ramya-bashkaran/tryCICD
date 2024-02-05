package com.example.EMS.repository;

import com.example.EMS.model.Employee;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;
public interface EmployeeRepository extends ElasticsearchRepository<Employee, String> {
}

