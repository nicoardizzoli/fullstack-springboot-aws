package com.nicoardizzoli.fullstackspringbootaws.student;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("api/v1/students")
public class StudentController {

    @GetMapping
    public List<Student> getAllStudents() {
        return List.of(
                new Student(1L, "Jamila","jam@gmail.com", Gender.FEMALE),
                new Student(2L, "Roberto","rb@gmail.com", Gender.MALE)
        );
    }
}
