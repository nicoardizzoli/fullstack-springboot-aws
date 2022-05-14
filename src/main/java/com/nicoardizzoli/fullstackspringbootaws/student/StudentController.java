package com.nicoardizzoli.fullstackspringbootaws.student;

import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@AllArgsConstructor
@RestController
@RequestMapping("api/v1/students")
public class StudentController {

    private final StudentService studentService;

    @GetMapping
    public List<Student> getAllStudents() {
        return studentService.getAllStudents();
    }

    @PostMapping
    public void addStudent(@Valid @RequestBody Student student) {
        studentService.saveStudent(student);
    }

    @DeleteMapping("{studentId}")
    public void deleteStudent(@PathVariable(name = "studentId") Long studentId) {
        studentService.deleteStudent(studentId);
    }
}
