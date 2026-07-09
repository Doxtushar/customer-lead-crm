package com.crm.customerleadcrm.service;

import com.crm.customerleadcrm.dto.FollowUpDto;
import java.util.List;

public interface FollowUpService {
    
    FollowUpDto createFollowUp(FollowUpDto followUpDto);
    
    List<FollowUpDto> getAllFollowUps();
    
    List<FollowUpDto> getFollowUpsByCustomerLeadId(Long customerLeadId);
    
    FollowUpDto getFollowUpById(Long id);
    
    FollowUpDto updateFollowUp(Long id, FollowUpDto followUpDto);
    
    void deleteFollowUp(Long id);
}