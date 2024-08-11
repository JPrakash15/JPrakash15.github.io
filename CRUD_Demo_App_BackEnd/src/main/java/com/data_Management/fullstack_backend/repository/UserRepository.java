package com.data_Management.fullstack_backend.repository;

import com.data_Management.fullstack_backend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User,Long> {
}
