package com.nicoardizzoli.fullstackspringbootaws.student;


import lombok.*;
import org.hibernate.Hibernate;

import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.util.Objects;

@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "student", uniqueConstraints = {
        @UniqueConstraint(name = "unique_name", columnNames = "name"),
        @UniqueConstraint(name = "unique_email", columnNames = "email")
})
@Entity(name = "Student")
public class Student {
    @Id
    @SequenceGenerator(name = "student_id_seq", sequenceName = "student_id_seq", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "student_id_seq")
    private Long id;

    @NotBlank
    @Column(name = "name", nullable = false)
    private String name;

    @NotBlank
    @Email
    @Column(name = "email", nullable = false)
    private String email;

    @NotNull
    @Enumerated(value = EnumType.STRING)
    @Column(name = "gender", nullable = false)
    private Gender gender;



    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
        Student student = (Student) o;
        return id != null && Objects.equals(id, student.id);
    }

    @Override
    public int hashCode() {
        return getClass().hashCode();
    }
}
