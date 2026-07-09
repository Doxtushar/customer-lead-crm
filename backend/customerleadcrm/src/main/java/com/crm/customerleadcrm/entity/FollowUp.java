package com.crm.customerleadcrm.entity;

import com.crm.customerleadcrm.entity.base.BaseEntity;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@Entity
@Table(name = "follow_up")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor

public class FollowUp extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "lead_id", nullable = false)
    private CustomerLead customerLead;

    private LocalDate followUpDate;

    @Column(length = 3000)
    private String discussion;

    private LocalDate nextFollowUpDate;

    private String status;

	
	public void setCustomerLead(CustomerLead customerLead) {
		this.customerLead = customerLead;
	}

	public CustomerLead getCustomerLead() {
		return customerLead;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public LocalDate getFollowUpDate() {
		return followUpDate;
	}

	public void setFollowUpDate(LocalDate followUpDate) {
		this.followUpDate = followUpDate;
	}

	public String getDiscussion() {
		return discussion;
	}

	public void setDiscussion(String discussion) {
		this.discussion = discussion;
	}

	public LocalDate getNextFollowUpDate() {
		return nextFollowUpDate;
	}

	public void setNextFollowUpDate(LocalDate nextFollowUpDate) {
		this.nextFollowUpDate = nextFollowUpDate;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}
	
}