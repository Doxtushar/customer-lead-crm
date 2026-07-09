package com.crm.customerleadcrm.service;

import com.crm.customerleadcrm.dto.LeadTypeDto;
import java.util.List;

public interface LeadTypeService {
    
    LeadTypeDto createLeadType(LeadTypeDto leadTypeDto);
    
    List<LeadTypeDto> getAllLeadTypes();
    
    LeadTypeDto getLeadTypeById(Long id);
    
    LeadTypeDto updateLeadType(Long id, LeadTypeDto leadTypeDto);
    
    void deleteLeadType(Long id);
}