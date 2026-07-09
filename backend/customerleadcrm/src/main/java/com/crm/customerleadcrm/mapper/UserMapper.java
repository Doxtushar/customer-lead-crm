package com.crm.customerleadcrm.mapper;

import com.crm.customerleadcrm.dto.UserDto;
import com.crm.customerleadcrm.entity.User;

public class UserMapper {

    private UserMapper() {
    }

    public static UserDto toDto(User entity) {
        if (entity == null) {
            return null;
        }

        UserDto dto = new UserDto();
        dto.setId(entity.getId());
        dto.setUsername(entity.getUsername());
        dto.setPassword(entity.getPassword());
        dto.setFullName(entity.getFullName());
        dto.setEmail(entity.getEmail());
        dto.setMobile(entity.getMobile());
        dto.setRole(entity.getRole());
        dto.setActive(entity.getActive());

        return dto;
    }

    public static User toEntity(UserDto dto) {
        if (dto == null) {
            return null;
        }

        User entity = new User();
        entity.setId(dto.getId());
        entity.setUsername(dto.getUsername());
        entity.setPassword(dto.getPassword());
        entity.setFullName(dto.getFullName());
        entity.setEmail(dto.getEmail());
        entity.setMobile(dto.getMobile());
        entity.setRole(dto.getRole());
        entity.setActive(dto.getActive());

        return entity;
    }
}