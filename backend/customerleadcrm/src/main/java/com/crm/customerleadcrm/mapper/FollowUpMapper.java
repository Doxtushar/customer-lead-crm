package com.crm.customerleadcrm.mapper;

import com.crm.customerleadcrm.dto.FollowUpDto;
import com.crm.customerleadcrm.entity.CustomerLead;
import com.crm.customerleadcrm.entity.FollowUp;

public class FollowUpMapper {

    private FollowUpMapper() {
    }

    public static FollowUpDto toDto(FollowUp entity) {
        if (entity == null) {
            return null;
        }

        FollowUpDto dto = new FollowUpDto();
        dto.setId(entity.getId());
        dto.setFollowUpDate(entity.getFollowUpDate());
        dto.setDiscussion(entity.getDiscussion());
        dto.setNextFollowUpDate(entity.getNextFollowUpDate());
        dto.setStatus(entity.getStatus());

        if (entity.getCustomerLead() != null) {
            dto.setCustomerLeadId(entity.getCustomerLead().getId());
        }

        return dto;
    }

    public static FollowUp toEntity(FollowUpDto dto) {
        if (dto == null) {
            return null;
        }

        FollowUp entity = new FollowUp();
        entity.setId(dto.getId());
        entity.setFollowUpDate(dto.getFollowUpDate());
        entity.setDiscussion(dto.getDiscussion());
        entity.setNextFollowUpDate(dto.getNextFollowUpDate());
        entity.setStatus(dto.getStatus());

        if (dto.getCustomerLeadId() != null) {
            CustomerLead customerLead = new CustomerLead();
            customerLead.setId(dto.getCustomerLeadId());
            entity.setCustomerLead(customerLead);
        }

        return entity;
    }
}