package com.crm.customerleadcrm.service.impl;

import com.crm.customerleadcrm.dto.FollowUpDto;
import com.crm.customerleadcrm.entity.CustomerLead;
import com.crm.customerleadcrm.entity.FollowUp;
import com.crm.customerleadcrm.exception.ResourceNotFoundException;
import com.crm.customerleadcrm.mapper.FollowUpMapper;
import com.crm.customerleadcrm.repository.CustomerLeadRepository;
import com.crm.customerleadcrm.repository.FollowUpRepository;
import com.crm.customerleadcrm.service.FollowUpService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class FollowUpServiceImpl implements FollowUpService {

    private final FollowUpRepository followUpRepository;
    private final CustomerLeadRepository customerLeadRepository;

    public FollowUpServiceImpl(FollowUpRepository followUpRepository, CustomerLeadRepository customerLeadRepository) {
        this.followUpRepository = followUpRepository;
        this.customerLeadRepository = customerLeadRepository;
    }

    @Override
    @Transactional
    public FollowUpDto createFollowUp(FollowUpDto followUpDto) {
        FollowUp followUp = FollowUpMapper.toEntity(followUpDto);

        CustomerLead customerLead = customerLeadRepository.findById(followUpDto.getCustomerLeadId())
                .orElseThrow(() -> new ResourceNotFoundException("CustomerLead not found with id: " + followUpDto.getCustomerLeadId()));
        
        followUp.setCustomerLead(customerLead);

        FollowUp savedFollowUp = followUpRepository.save(followUp);
        return FollowUpMapper.toDto(savedFollowUp);
    }

    @Override
    @Transactional(readOnly = true)
    public List<FollowUpDto> getAllFollowUps() {
        return followUpRepository.findAll().stream()
                .map(FollowUpMapper::toDto)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public List<FollowUpDto> getFollowUpsByCustomerLeadId(Long customerLeadId) {
        return followUpRepository.findByCustomerLeadId(customerLeadId).stream()
                .map(FollowUpMapper::toDto)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public FollowUpDto getFollowUpById(Long id) {
        FollowUp followUp = followUpRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("FollowUp not found with id: " + id));
        return FollowUpMapper.toDto(followUp);
    }

    @Override
    @Transactional
    public FollowUpDto updateFollowUp(Long id, FollowUpDto followUpDto) {
        FollowUp existingFollowUp = followUpRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("FollowUp not found with id: " + id));

        CustomerLead customerLead = customerLeadRepository.findById(followUpDto.getCustomerLeadId())
                .orElseThrow(() -> new ResourceNotFoundException("CustomerLead not found with id: " + followUpDto.getCustomerLeadId()));

        existingFollowUp.setFollowUpDate(followUpDto.getFollowUpDate());
        existingFollowUp.setDiscussion(followUpDto.getDiscussion());
        existingFollowUp.setNextFollowUpDate(followUpDto.getNextFollowUpDate());
        existingFollowUp.setStatus(followUpDto.getStatus());
        existingFollowUp.setCustomerLead(customerLead);

        FollowUp updatedFollowUp = followUpRepository.save(existingFollowUp);
        return FollowUpMapper.toDto(updatedFollowUp);
    }

    @Override
    @Transactional
    public void deleteFollowUp(Long id) {
        FollowUp followUp = followUpRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("FollowUp not found with id: " + id));
        followUpRepository.delete(followUp);
    }
}