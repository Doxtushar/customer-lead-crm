package com.crm.customerleadcrm.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.time.LocalDate;

public class FollowUpDto {

    private Long id;

    @NotNull(message = "Customer Lead ID is required")
    private Long customerLeadId;

    @NotNull(message = "Follow-up date is required")
    private LocalDate followUpDate;

    @NotBlank(message = "Discussion is required")
    private String discussion;
    
    private LocalDate nextFollowUpDate;

    private String status;

    public FollowUpDto() {
    }

    public FollowUpDto(Long id, Long customerLeadId, LocalDate followUpDate, String discussion, LocalDate nextFollowUpDate, String status) {
        this.id = id;
        this.customerLeadId = customerLeadId;
        this.followUpDate = followUpDate;
        this.discussion = discussion;
        this.nextFollowUpDate = nextFollowUpDate;
        this.status = status;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Long getCustomerLeadId() { return customerLeadId; }
    public void setCustomerLeadId(Long customerLeadId) { this.customerLeadId = customerLeadId; }

    public LocalDate getFollowUpDate() { return followUpDate; }
    public void setFollowUpDate(LocalDate followUpDate) { this.followUpDate = followUpDate; }

    public String getDiscussion() { return discussion; }
    public void setDiscussion(String discussion) { this.discussion = discussion; }

    public LocalDate getNextFollowUpDate() { return nextFollowUpDate; }
    public void setNextFollowUpDate(LocalDate nextFollowUpDate) { this.nextFollowUpDate = nextFollowUpDate; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
}