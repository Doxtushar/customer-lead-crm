package com.crm.customerleadcrm.entity;

import com.crm.customerleadcrm.entity.base.BaseEntity;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "notes")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor

public class Note extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "lead_id", nullable = false)
    private CustomerLead customerLead;

    @Column(length = 3000)
    private String note;

	private String content;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public CustomerLead getCustomerLead() {
		return customerLead;
	}

	public void setCustomerLead(CustomerLead customerLead) {
		this.customerLead = customerLead;
	}

	public String getNote() {
		return note;
	}

	public void setNote(String note) {
		this.note = note;
	}

	public void setContent(String content) {
		this.content = content;
		
	}

	public String getContent() {
		return content;
	}

	

	
}