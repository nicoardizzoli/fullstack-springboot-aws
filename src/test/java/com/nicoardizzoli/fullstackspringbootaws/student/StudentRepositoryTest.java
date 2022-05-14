package com.nicoardizzoli.fullstackspringbootaws.student;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.Optional;

import static org.mockito.BDDMockito.given;
import static org.mockito.BDDMockito.then;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;
import static org.assertj.core.api.Assertions.assertThat;

@DataJpaTest
class StudentRepositoryTest {

    @Autowired
    private StudentRepository underTestStudentRepository;

    @BeforeEach
    void setUp() {
    }


    @Test
    void itShouldCheckIfStudentExistsFindStudentByEmail() {
        //Given
        Student student = new Student(
                1L,
                "jamila",
                "jamila@gmail.com",
                Gender.FEMALE
        );
        underTestStudentRepository.save(student);
        //When
        Optional<Student> optionalStudent = underTestStudentRepository.findStudentByEmail("jamila@gmail.com");

        //Then
        assertThat(optionalStudent).isPresent();

    }
}