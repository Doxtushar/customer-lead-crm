package com.crm.customerleadcrm.service.impl;

import com.crm.customerleadcrm.dto.CustomerLeadDto;
import com.crm.customerleadcrm.entity.CustomerLead;
import com.crm.customerleadcrm.entity.LeadType;
import com.crm.customerleadcrm.entity.User;
import com.crm.customerleadcrm.exception.ResourceNotFoundException;
import com.crm.customerleadcrm.mapper.CustomerLeadMapper;
import com.crm.customerleadcrm.repository.CustomerLeadRepository;
import com.crm.customerleadcrm.repository.LeadTypeRepository;
import com.crm.customerleadcrm.repository.UserRepository;
import com.crm.customerleadcrm.service.CustomerLeadService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CustomerLeadServiceImpl implements CustomerLeadService {

    private final CustomerLeadRepository customerLeadRepository;
    private final LeadTypeRepository leadTypeRepository;
    private final UserRepository userRepository;

    public CustomerLeadServiceImpl(CustomerLeadRepository customerLeadRepository, 
                                   LeadTypeRepository leadTypeRepository, 
                                   UserRepository userRepository) {
        this.customerLeadRepository = customerLeadRepository;
        this.leadTypeRepository = leadTypeRepository;
        this.userRepository = userRepository;
    }

    @Override
    @Transactional
    public CustomerLeadDto createCustomerLead(CustomerLeadDto customerLeadDto) {
        CustomerLead customerLead = CustomerLeadMapper.toEntity(customerLeadDto);
        
        // Fetch and set managed relational entities to ensure integrity
        LeadType leadType = leadTypeRepository.findById(customerLeadDto.getLeadTypeId())
                .orElseThrow(() -> new ResourceNotFoundException("LeadType not found with id: " + customerLeadDto.getLeadTypeId()));
        customerLead.setLeadType(leadType);

        User assignedExecutive = userRepository.findById(customerLeadDto.getAssignedExecutiveId())
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + customerLeadDto.getAssignedExecutiveId()));
        customerLead.setAssignedExecutive(assignedExecutive);

        CustomerLead savedLead = customerLeadRepository.save(customerLead);
        return CustomerLeadMapper.toDto(savedLead);
    }

    @Override
    @Transactional(readOnly = true)
    public List<CustomerLeadDto> getAllCustomerLeads() {
        return customerLeadRepository.findAll().stream()
                .map(CustomerLeadMapper::toDto)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public CustomerLeadDto getCustomerLeadById(Long id) {
        CustomerLead customerLead = customerLeadRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("CustomerLead not found with id: " + id));
        return CustomerLeadMapper.toDto(customerLead);
    }

    @Override
    @Transactional
    public CustomerLeadDto updateCustomerLead(Long id, CustomerLeadDto customerLeadDto) {
        CustomerLead existingLead = customerLeadRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("CustomerLead not found with id: " + id));

        // Fetch new relationships
        LeadType leadType = leadTypeRepository.findById(customerLeadDto.getLeadTypeId())
                .orElseThrow(() -> new ResourceNotFoundException("LeadType not found with id: " + customerLeadDto.getLeadTypeId()));
        
        User assignedExecutive = userRepository.findById(customerLeadDto.getAssignedExecutiveId())
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + customerLeadDto.getAssignedExecutiveId()));

        // Manual field updates (No updateEntityFromDto)
        existingLead.setCustomerName(customerLeadDto.getCustomerName());
        existingLead.setMobile(customerLeadDto.getMobile());
        existingLead.setAlternateNumber(customerLeadDto.getAlternateNumber());
        existingLead.setEmail(customerLeadDto.getEmail());
        existingLead.setLeadType(leadType);
        existingLead.setCity(customerLeadDto.getCity());
        existingLead.setAddress(customerLeadDto.getAddress());
        existingLead.setRequirement(customerLeadDto.getRequirement());
        existingLead.setLeadSource(customerLeadDto.getLeadSource());
        existingLead.setAssignedExecutive(assignedExecutive);
        existingLead.setDiscussionDetails(customerLeadDto.getDiscussionDetails());
        existingLead.setVisitDate(customerLeadDto.getVisitDate());
        existingLead.setNextFollowUpDate(customerLeadDto.getNextFollowUpDate());
        existingLead.setStatus(customerLeadDto.getStatus());
        existingLead.setPriority(customerLeadDto.getPriority());

        CustomerLead updatedLead = customerLeadRepository.save(existingLead);
        return CustomerLeadMapper.toDto(updatedLead);
    }

    @Override
    @Transactional
    public void deleteCustomerLead(Long id) {
        CustomerLead customerLead = customerLeadRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("CustomerLead not found with id: " + id));
        customerLeadRepository.delete(customerLead);
    }
}