package com.crm.customerleadcrm.service;

import com.crm.customerleadcrm.dto.CustomerLeadDto;
import java.util.List;

public interface CustomerLeadService {
    CustomerLeadDto createCustomerLead(CustomerLeadDto customerLeadDto);
    List<CustomerLeadDto> getAllCustomerLeads();
    CustomerLeadDto getCustomerLeadById(Long id);
    CustomerLeadDto updateCustomerLead(Long id, CustomerLeadDto customerLeadDto);
    void deleteCustomerLead(Long id);
}