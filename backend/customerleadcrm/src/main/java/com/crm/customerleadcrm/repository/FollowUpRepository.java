package com.crm.customerleadcrm.repository;

import com.crm.customerleadcrm.entity.FollowUp;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FollowUpRepository extends JpaRepository<FollowUp, Long> {
    List<FollowUp> findByCustomerLeadId(Long customerLeadId);
}