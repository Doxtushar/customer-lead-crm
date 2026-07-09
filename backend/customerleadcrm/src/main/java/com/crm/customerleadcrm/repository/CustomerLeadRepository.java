package com.crm.customerleadcrm.repository;

import com.crm.customerleadcrm.entity.CustomerLead;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CustomerLeadRepository extends JpaRepository<CustomerLead, Long> {
}