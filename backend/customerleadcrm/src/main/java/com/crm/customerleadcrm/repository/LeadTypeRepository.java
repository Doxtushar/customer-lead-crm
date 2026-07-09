package com.crm.customerleadcrm.repository;

import com.crm.customerleadcrm.entity.LeadType;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LeadTypeRepository extends JpaRepository<LeadType, Long> {
}