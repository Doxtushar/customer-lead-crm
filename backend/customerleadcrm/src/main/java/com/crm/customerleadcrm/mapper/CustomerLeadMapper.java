package com.crm.customerleadcrm.mapper;

import com.crm.customerleadcrm.dto.CustomerLeadDto;
import com.crm.customerleadcrm.entity.CustomerLead;
import com.crm.customerleadcrm.entity.LeadType;
import com.crm.customerleadcrm.entity.User;

public class CustomerLeadMapper {

    private CustomerLeadMapper() {
        // Private constructor to hide the implicit public one
    }

    public static CustomerLeadDto toDto(CustomerLead entity) {
        if (entity == null) {
            return null;
        }

        CustomerLeadDto dto = new CustomerLeadDto();
        dto.setId(entity.getId());
        dto.setCustomerName(entity.getCustomerName());
        dto.setMobile(entity.getMobile());
        dto.setAlternateNumber(entity.getAlternateNumber());
        dto.setEmail(entity.getEmail());
        
        if (entity.getLeadType() != null) {
            dto.setLeadTypeId(entity.getLeadType().getId());
        }
        
        dto.setCity(entity.getCity());
        dto.setAddress(entity.getAddress());
        dto.setRequirement(entity.getRequirement());
        dto.setLeadSource(entity.getLeadSource());
        
        if (entity.getAssignedExecutive() != null) {
            dto.setAssignedExecutiveId(entity.getAssignedExecutive().getId());
        }
        
        dto.setDiscussionDetails(entity.getDiscussionDetails());
        dto.setVisitDate(entity.getVisitDate());
        dto.setNextFollowUpDate(entity.getNextFollowUpDate());
        dto.setStatus(entity.getStatus());
        dto.setPriority(entity.getPriority());

        return dto;
    }

    public static CustomerLead toEntity(CustomerLeadDto dto) {
        if (dto == null) {
            return null;
        }

        CustomerLead entity = new CustomerLead();
        entity.setId(dto.getId());
        entity.setCustomerName(dto.getCustomerName());
        entity.setMobile(dto.getMobile());
        entity.setAlternateNumber(dto.getAlternateNumber());
        entity.setEmail(dto.getEmail());
        
        // Relationships are instantiated as proxy objects to hold the ID for Hibernate.
        // Full entities will be managed by the Service layer before saving.
        if (dto.getLeadTypeId() != null) {
            LeadType leadType = new LeadType();
            leadType.setId(dto.getLeadTypeId());
            entity.setLeadType(leadType);
        }

        entity.setCity(dto.getCity());
        entity.setAddress(dto.getAddress());
        entity.setRequirement(dto.getRequirement());
        entity.setLeadSource(dto.getLeadSource());

        if (dto.getAssignedExecutiveId() != null) {
            User user = new User();
            user.setId(dto.getAssignedExecutiveId());
            entity.setAssignedExecutive(user);
        }

        entity.setDiscussionDetails(dto.getDiscussionDetails());
        entity.setVisitDate(dto.getVisitDate());
        entity.setNextFollowUpDate(dto.getNextFollowUpDate());
        entity.setStatus(dto.getStatus());
        entity.setPriority(dto.getPriority());

        return entity;
    }
}