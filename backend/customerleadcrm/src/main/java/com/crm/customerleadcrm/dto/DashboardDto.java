package com.crm.customerleadcrm.dto;

import java.util.List;
import java.util.Map;

public class DashboardDto {

    private Long totalLeads;
    private Long activeLeadTypes;
    private Long pendingFollowUps;
    private Long completedFollowUps;
    private Long notesCount;
    private Long remindersDue;
    private Double conversionRate;
    private List<CustomerLeadDto> recentLeads;
    private Map<String, Long> leadStatusCounts;
    private Map<String, Long> monthlyLeadCounts;

    public DashboardDto() {
    }

    public DashboardDto(Long totalLeads, Long activeLeadTypes, Long pendingFollowUps, Long completedFollowUps, 
                        Long notesCount, Long remindersDue, Double conversionRate, List<CustomerLeadDto> recentLeads, 
                        Map<String, Long> leadStatusCounts, Map<String, Long> monthlyLeadCounts) {
        this.totalLeads = totalLeads;
        this.activeLeadTypes = activeLeadTypes;
        this.pendingFollowUps = pendingFollowUps;
        this.completedFollowUps = completedFollowUps;
        this.notesCount = notesCount;
        this.remindersDue = remindersDue;
        this.conversionRate = conversionRate;
        this.recentLeads = recentLeads;
        this.leadStatusCounts = leadStatusCounts;
        this.monthlyLeadCounts = monthlyLeadCounts;
    }

    public Long getTotalLeads() {
        return totalLeads;
    }

    public void setTotalLeads(Long totalLeads) {
        this.totalLeads = totalLeads;
    }

    public Long getActiveLeadTypes() {
        return activeLeadTypes;
    }

    public void setActiveLeadTypes(Long activeLeadTypes) {
        this.activeLeadTypes = activeLeadTypes;
    }

    public Long getPendingFollowUps() {
        return pendingFollowUps;
    }

    public void setPendingFollowUps(Long pendingFollowUps) {
        this.pendingFollowUps = pendingFollowUps;
    }

    public Long getCompletedFollowUps() {
        return completedFollowUps;
    }

    public void setCompletedFollowUps(Long completedFollowUps) {
        this.completedFollowUps = completedFollowUps;
    }

    public Long getNotesCount() {
        return notesCount;
    }

    public void setNotesCount(Long notesCount) {
        this.notesCount = notesCount;
    }

    public Long getRemindersDue() {
        return remindersDue;
    }

    public void setRemindersDue(Long remindersDue) {
        this.remindersDue = remindersDue;
    }

    public Double getConversionRate() {
        return conversionRate;
    }

    public void setConversionRate(Double conversionRate) {
        this.conversionRate = conversionRate;
    }

    public List<CustomerLeadDto> getRecentLeads() {
        return recentLeads;
    }

    public void setRecentLeads(List<CustomerLeadDto> recentLeads) {
        this.recentLeads = recentLeads;
    }

    public Map<String, Long> getLeadStatusCounts() {
        return leadStatusCounts;
    }

    public void setLeadStatusCounts(Map<String, Long> leadStatusCounts) {
        this.leadStatusCounts = leadStatusCounts;
    }

    public Map<String, Long> getMonthlyLeadCounts() {
        return monthlyLeadCounts;
    }

    public void setMonthlyLeadCounts(Map<String, Long> monthlyLeadCounts) {
        this.monthlyLeadCounts = monthlyLeadCounts;
    }
}