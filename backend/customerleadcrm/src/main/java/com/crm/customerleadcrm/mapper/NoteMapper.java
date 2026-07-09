package com.crm.customerleadcrm.mapper;

import com.crm.customerleadcrm.dto.NoteDto;
import com.crm.customerleadcrm.entity.CustomerLead;
import com.crm.customerleadcrm.entity.Note;

public class NoteMapper {

    private NoteMapper() {
    }

    public static NoteDto toDto(Note entity) {
        if (entity == null) {
            return null;
        }

        NoteDto dto = new NoteDto();
        dto.setId(entity.getId());
        dto.setContent(entity.getContent());

        if (entity.getCustomerLead() != null) {
            dto.setCustomerLeadId(entity.getCustomerLead().getId());
        }

        return dto;
    }

    public static Note toEntity(NoteDto dto) {
        if (dto == null) {
            return null;
        }

        Note entity = new Note();
        entity.setId(dto.getId());
        entity.setContent(dto.getContent());

        if (dto.getCustomerLeadId() != null) {
            CustomerLead customerLead = new CustomerLead();
            customerLead.setId(dto.getCustomerLeadId());
            entity.setCustomerLead(customerLead);
        }

        return entity;
    }
}