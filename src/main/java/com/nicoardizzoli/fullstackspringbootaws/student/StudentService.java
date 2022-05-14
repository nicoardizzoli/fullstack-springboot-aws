package com.nicoardizzoli.fullstackspringbootaws.student;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@AllArgsConstructor
@Service
public class StudentService {

    private final StudentRepository studentRepository;

    public List<Student> getAllStudents() {
        return studentRepository.findAll();
    }

    public void saveStudent(Student student) {
        if (studentRepository.findStudentByEmail(student.getEmail()).isPresent())
            throw new IllegalStateException("Student existent with email: " + student.getEmail());
        studentRepository.save(student);
    }

    public void deleteStudent(Long studentId) {
        if (studentRepository.findById(studentId).isEmpty()) throw new IllegalStateException("Student not found");
        studentRepository.deleteById(studentId);
    }

}
