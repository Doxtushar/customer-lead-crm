package com.crm.customerleadcrm.dto;

import com.crm.customerleadcrm.enums.LeadStatus;
import com.crm.customerleadcrm.enums.Priority;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDate;

public class CustomerLeadDto {

    private Long id;

    @NotBlank(message = "Customer name is required")
    private String customerName;

    @NotBlank(message = "Mobile number is required")
    private String mobile;

    private String alternateNumber;

    @Email(message = "Email should be valid")
    private String email;

    @NotNull(message = "Lead Type ID is required")
    private Long leadTypeId;

    private String city;
    private String address;
    private String requirement;
    private String leadSource;

    // Explicitly NOT mandatory (No @NotNull)
    private Long assignedExecutiveId;

    private String discussionDetails;
    private LocalDate visitDate;
    private LocalDate nextFollowUpDate;
    private LeadStatus status;
    private Priority priority;

    public CustomerLeadDto() {
    }

    public CustomerLeadDto(Long id, String customerName, String mobile, String alternateNumber, String email, 
                           Long leadTypeId, String city, String address, String requirement, String leadSource, 
                           Long assignedExecutiveId, String discussionDetails, LocalDate visitDate, 
                           LocalDate nextFollowUpDate, LeadStatus status, Priority priority) {
        this.id = id;
        this.customerName = customerName;
        this.mobile = mobile;
        this.alternateNumber = alternateNumber;
        this.email = email;
        this.leadTypeId = leadTypeId;
        this.city = city;
        this.address = address;
        this.requirement = requirement;
        this.leadSource = leadSource;
        this.assignedExecutiveId = assignedExecutiveId;
        this.discussionDetails = discussionDetails;
        this.visitDate = visitDate;
        this.nextFollowUpDate = nextFollowUpDate;
        this.status = status;
        this.priority = priority;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getCustomerName() { return customerName; }
    public void setCustomerName(String customerName) { this.customerName = customerName; }

    public String getMobile() { return mobile; }
    public void setMobile(String mobile) { this.mobile = mobile; }

    public String getAlternateNumber() { return alternateNumber; }
    public void setAlternateNumber(String alternateNumber) { this.alternateNumber = alternateNumber; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public Long getLeadTypeId() { return leadTypeId; }
    public void setLeadTypeId(Long leadTypeId) { this.leadTypeId = leadTypeId; }

    public String getCity() { return city; }
    public void setCity(String city) { this.city = city; }

    public String getAddress() { return address; }
    public void setAddress(String address) { this.address = address; }

    public String getRequirement() { return requirement; }
    public void setRequirement(String requirement) { this.requirement = requirement; }

    public String getLeadSource() { return leadSource; }
    public void setLeadSource(String leadSource) { this.leadSource = leadSource; }

    public Long getAssignedExecutiveId() { return assignedExecutiveId; }
    public void setAssignedExecutiveId(Long assignedExecutiveId) { this.assignedExecutiveId = assignedExecutiveId; }

    public String getDiscussionDetails() { return discussionDetails; }
    public void setDiscussionDetails(String discussionDetails) { this.discussionDetails = discussionDetails; }

    public LocalDate getVisitDate() { return visitDate; }
    public void setVisitDate(LocalDate visitDate) { this.visitDate = visitDate; }

    public LocalDate getNextFollowUpDate() { return nextFollowUpDate; }
    public void setNextFollowUpDate(LocalDate nextFollowUpDate) { this.nextFollowUpDate = nextFollowUpDate; }

    public LeadStatus getStatus() { return status; }
    public void setStatus(LeadStatus status) { this.status = status; }

    public Priority getPriority() { return priority; }
    public void setPriority(Priority priority) { this.priority = priority; }
}