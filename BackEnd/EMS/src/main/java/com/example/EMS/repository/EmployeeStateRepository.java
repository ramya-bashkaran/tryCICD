package com.example.EMS.repository;
import com.example.EMS.model.EmployeeState;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;
public interface EmployeeStateRepository extends ElasticsearchRepository<EmployeeState, String> {
    // You can add custom query methods if needed
}
