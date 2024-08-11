package com.data_Management.fullstack_backend.exceptions;

public class UserNotFoundException extends RuntimeException{
    public UserNotFoundException(Long id){
        super("Could not find the user ID " + id);
    }
}
