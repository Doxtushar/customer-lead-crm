package com.crm.customerleadcrm.entity;

import com.crm.customerleadcrm.entity.base.BaseEntity;
import com.crm.customerleadcrm.enums.LeadStatus;
import com.crm.customerleadcrm.enums.Priority;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "customer_lead")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CustomerLead extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String customerName;

    @Column(nullable = false, length = 10)
    private String mobile;

    private String alternateNumber;

    private String email;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "lead_type_id", nullable = false)
    private LeadType leadType;

    private String city;

    @Column(length = 1000)
    private String address;

    @Column(length = 2000)
    private String requirement;

    private String leadSource;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "assigned_user_id")
    private User assignedExecutive;

    @Column(length = 3000)
    private String discussionDetails;

    private LocalDate visitDate;

    private LocalDate nextFollowUpDate;

    @Enumerated(EnumType.STRING)
    private LeadStatus status;

    @Enumerated(EnumType.STRING)
    private Priority priority;

    @OneToMany(mappedBy = "customerLead", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<FollowUp> followUps = new ArrayList<>();

    @OneToMany(mappedBy = "customerLead", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Note> notes = new ArrayList<>();

    // Default Constructor
    public CustomerLead() {
    }

    // Parameterized Constructor
    // Note: It is a best practice to omit managed collections (like followUps and notes) from the constructor 
    // to allow Hibernate to manage them properly.
    public CustomerLead(Long id, String customerName, String mobile, String alternateNumber, String email, 
                        LeadType leadType, String city, String address, String requirement, String leadSource, 
                        User assignedExecutive, String discussionDetails, LocalDate visitDate, 
                        LocalDate nextFollowUpDate, LeadStatus status, Priority priority) {
        this.id = id;
        this.customerName = customerName;
        this.mobile = mobile;
        this.alternateNumber = alternateNumber;
        this.email = email;
        this.leadType = leadType;
        this.city = city;
        this.address = address;
        this.requirement = requirement;
        this.leadSource = leadSource;
        this.assignedExecutive = assignedExecutive;
        this.discussionDetails = discussionDetails;
        this.visitDate = visitDate;
        this.nextFollowUpDate = nextFollowUpDate;
        this.status = status;
        this.priority = priority;
    }

    // Getters and Setters

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCustomerName() {
        return customerName;
    }

    public void setCustomerName(String customerName) {
        this.customerName = customerName;
    }

    public String getMobile() {
        return mobile;
    }

    public void setMobile(String mobile) {
        this.mobile = mobile;
    }

    public String getAlternateNumber() {
        return alternateNumber;
    }

    public void setAlternateNumber(String alternateNumber) {
        this.alternateNumber = alternateNumber;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public LeadType getLeadType() {
        return leadType;
    }

    public void setLeadType(LeadType leadType) {
        this.leadType = leadType;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getRequirement() {
        return requirement;
    }

    public void setRequirement(String requirement) {
        this.requirement = requirement;
    }

    public String getLeadSource() {
        return leadSource;
    }

    public void setLeadSource(String leadSource) {
        this.leadSource = leadSource;
    }

    public User getAssignedExecutive() {
        return assignedExecutive;
    }

    public void setAssignedExecutive(User assignedExecutive) {
        this.assignedExecutive = assignedExecutive;
    }

    public String getDiscussionDetails() {
        return discussionDetails;
    }

    public void setDiscussionDetails(String discussionDetails) {
        this.discussionDetails = discussionDetails;
    }

    public LocalDate getVisitDate() {
        return visitDate;
    }

    public void setVisitDate(LocalDate visitDate) {
        this.visitDate = visitDate;
    }

    public LocalDate getNextFollowUpDate() {
        return nextFollowUpDate;
    }

    public void setNextFollowUpDate(LocalDate nextFollowUpDate) {
        this.nextFollowUpDate = nextFollowUpDate;
    }

    public LeadStatus getStatus() {
        return status;
    }

    public void setStatus(LeadStatus status) {
        this.status = status;
    }

    public Priority getPriority() {
        return priority;
    }

    public void setPriority(Priority priority) {
        this.priority = priority;
    }

    public List<FollowUp> getFollowUps() {
        return followUps;
    }

    public void setFollowUps(List<FollowUp> followUps) {
        this.followUps = followUps;
    }

    public List<Note> getNotes() {
        return notes;
    }

    public void setNotes(List<Note> notes) {
        this.notes = notes;
    }
    
    // Convenience methods for bi-directional relationships
    public void addFollowUp(FollowUp followUp) {
        followUps.add(followUp);
        // Assuming FollowUp entity has a setCustomerLead method
        // followUp.setCustomerLead(this);
    }

    public void removeFollowUp(FollowUp followUp) {
        followUps.remove(followUp);
        // followUp.setCustomerLead(null);
    }

    public void addNote(Note note) {
        notes.add(note);
        // Assuming Note entity has a setCustomerLead method
        // note.setCustomerLead(this);
    }

    public void removeNote(Note note) {
        notes.remove(note);
        // note.setCustomerLead(null);
    }

	
}