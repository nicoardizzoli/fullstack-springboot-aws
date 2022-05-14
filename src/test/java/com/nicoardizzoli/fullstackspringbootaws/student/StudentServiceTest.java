package com.nicoardizzoli.fullstackspringbootaws.student;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Disabled;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class StudentServiceTest {

    @Mock
    private StudentRepository studentRepository;


    private StudentService underTestStudentService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        underTestStudentService = new StudentService(studentRepository);
    }


    @Test
    void itShouldGetAllStudents() {
        //Given
        //When
        underTestStudentService.getAllStudents();
        //Then
        verify(studentRepository).findAll();

    }


    @Test
    void itShouldSaveStudent() {
        //Given
        Student student = new Student(
                1L,
                "jamila",
                "jamila@gmail.com",
                Gender.FEMALE
        );

        //When
        underTestStudentService.saveStudent(student);

        //Then
        ArgumentCaptor<Student> studentArgumentCaptor = ArgumentCaptor.forClass(Student.class);
        verify(studentRepository).save(studentArgumentCaptor.capture());

        assertThat(studentArgumentCaptor.getValue()).isEqualTo(student);
    }

    @Test
    void itShouldNotSaveStudentWhenEmailIsTaken() {
        //Given
        Student student = new Student(
                1L,
                "jamila",
                "jamila@gmail.com",
                Gender.FEMALE
        );

        given(studentRepository.findStudentByEmail(student.getEmail())).willReturn(Optional.of(student));

        //When
        //Then
        assertThatThrownBy(() -> underTestStudentService.saveStudent(student))
                .isInstanceOf(IllegalStateException.class)
                .hasMessage("Student existent with email: " + student.getEmail());

        verify(studentRepository, never()).save(any());

    }


    @Test
    void itShouldNotDeleteStudentWhenStudentDoesntExist() {
        //Given
        Long studentId = 1L;

        given(studentRepository.findById(studentId)).willReturn(Optional.empty());

        //When
        //Then
        assertThatThrownBy(() -> underTestStudentService.deleteStudent(studentId))
                .isInstanceOf(IllegalStateException.class)
                .hasMessage("Student not found");

        verify(studentRepository, never()).deleteById(any());

    }

    @Test
    void itShouldDeleteStudentWhenStudentExist() {
        //Given
        Long studentId = 1L;

        given(studentRepository.findById(studentId)).willReturn(Optional.of(mock(Student.class)));

        //When
        underTestStudentService.deleteStudent(studentId);

        //Then
        verify(studentRepository).deleteById(studentId);

    }
}