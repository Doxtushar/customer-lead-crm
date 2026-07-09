package com.crm.customerleadcrm.mapper;

import com.crm.customerleadcrm.dto.LeadTypeDto;
import com.crm.customerleadcrm.entity.LeadType;

public class LeadTypeMapper {

	public static LeadTypeDto toDto(LeadType entity) {

		LeadTypeDto dto = new LeadTypeDto();

		dto.setId(entity.getId());
		dto.setName(entity.getName());
		dto.setDescription(entity.getDescription());
		dto.setActive(entity.getActive());

		return dto;
	}

	public static LeadType toEntity(LeadTypeDto dto) {

		LeadType entity = new LeadType();

		entity.setId(dto.getId());
		entity.setName(dto.getName());
		entity.setDescription(dto.getDescription());
		entity.setActive(dto.getActive());

		return entity;
	}
}