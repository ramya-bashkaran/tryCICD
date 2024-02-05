package com.example.EMS.model;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.elasticsearch.annotations.Document;
@Setter
@Getter
@Document(indexName = "employeestates")
@Data
public class EmployeeState {
    private String id;
    private long lastAssignedId;

}

