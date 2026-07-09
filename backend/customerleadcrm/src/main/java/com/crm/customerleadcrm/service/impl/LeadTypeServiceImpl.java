package com.crm.customerleadcrm.service.impl;

import com.crm.customerleadcrm.dto.LeadTypeDto;
import com.crm.customerleadcrm.entity.LeadType;
import com.crm.customerleadcrm.exception.ResourceNotFoundException;
import com.crm.customerleadcrm.mapper.LeadTypeMapper;
import com.crm.customerleadcrm.repository.LeadTypeRepository;
import com.crm.customerleadcrm.service.LeadTypeService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class LeadTypeServiceImpl implements LeadTypeService {

    private final LeadTypeRepository leadTypeRepository;

    // Constructor Injection (No @Autowired)
    public LeadTypeServiceImpl(LeadTypeRepository leadTypeRepository) {
        this.leadTypeRepository = leadTypeRepository;
    }

    @Override
    @Transactional
    public LeadTypeDto createLeadType(LeadTypeDto leadTypeDto) {
        LeadType leadType = LeadTypeMapper.toEntity(leadTypeDto);
        LeadType savedLeadType = leadTypeRepository.save(leadType);
        return LeadTypeMapper.toDto(savedLeadType);
    }

    @Override
    @Transactional(readOnly = true)
    public List<LeadTypeDto> getAllLeadTypes() {
        return leadTypeRepository.findAll().stream()
                .map(LeadTypeMapper::toDto)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public LeadTypeDto getLeadTypeById(Long id) {
        LeadType leadType = leadTypeRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("LeadType not found with id: " + id));
        return LeadTypeMapper.toDto(leadType);
    }

    @Override
    @Transactional
    public LeadTypeDto updateLeadType(Long id, LeadTypeDto leadTypeDto) {
        LeadType existingLeadType = leadTypeRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("LeadType not found with id: " + id));

        // Manual field updates (No Builder, No updateEntityFromDto mapper method)
        existingLeadType.setName(leadTypeDto.getName());
        existingLeadType.setDescription(leadTypeDto.getDescription());
        // Add any other fields that exist in your specific LeadType entity here

        LeadType updatedLeadType = leadTypeRepository.save(existingLeadType);
        return LeadTypeMapper.toDto(updatedLeadType);
    }

    @Override
    @Transactional
    public void deleteLeadType(Long id) {
        LeadType leadType = leadTypeRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("LeadType not found with id: " + id));
        leadTypeRepository.delete(leadType);
    }
}