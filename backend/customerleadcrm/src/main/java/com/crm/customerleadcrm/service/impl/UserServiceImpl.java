package com.crm.customerleadcrm.service.impl;

import com.crm.customerleadcrm.dto.UserDto;
import com.crm.customerleadcrm.entity.User;
import com.crm.customerleadcrm.exception.ResourceNotFoundException;
import com.crm.customerleadcrm.mapper.UserMapper;
import com.crm.customerleadcrm.repository.UserRepository;
import com.crm.customerleadcrm.service.UserService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class UserServiceImpl implements UserService {

	private final UserRepository userRepository;

	public UserServiceImpl(UserRepository userRepository) {
		this.userRepository = userRepository;
	}

	@Override
	@Transactional
	public UserDto createUser(UserDto userDto) {

		User user = UserMapper.toEntity(userDto);

		// Force Hibernate to INSERT a new record
		user.setId(null);

		User savedUser = userRepository.save(user);

		return UserMapper.toDto(savedUser);
	}

	@Override
	@Transactional(readOnly = true)
	public List<UserDto> getAllUsers() {
		return userRepository.findAll().stream().map(UserMapper::toDto).collect(Collectors.toList());
	}

	@Override
	@Transactional(readOnly = true)
	public UserDto getUserById(Long id) {
		User user = userRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + id));
		return UserMapper.toDto(user);
	}

	@Override
	@Transactional
	public UserDto updateUser(Long id, UserDto userDto) {
		User existingUser = userRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + id));

		existingUser.setUsername(userDto.getUsername());
		existingUser.setPassword(userDto.getPassword());
		existingUser.setFullName(userDto.getFullName());
		existingUser.setEmail(userDto.getEmail());
		existingUser.setMobile(userDto.getMobile());
		existingUser.setRole(userDto.getRole());
		existingUser.setActive(userDto.getActive());

		User updatedUser = userRepository.save(existingUser);
		return UserMapper.toDto(updatedUser);
	}

	@Override
	@Transactional
	public void deleteUser(Long id) {
		User user = userRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + id));
		userRepository.delete(user);
	}
}