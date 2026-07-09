package com.crm.customerleadcrm.service.impl;

import com.crm.customerleadcrm.dto.CustomerLeadDto;
import com.crm.customerleadcrm.dto.DashboardDto;
import com.crm.customerleadcrm.entity.CustomerLead;
import com.crm.customerleadcrm.entity.FollowUp;
import com.crm.customerleadcrm.mapper.CustomerLeadMapper;
import com.crm.customerleadcrm.repository.CustomerLeadRepository;
import com.crm.customerleadcrm.repository.FollowUpRepository;
import com.crm.customerleadcrm.repository.LeadTypeRepository;
import com.crm.customerleadcrm.repository.NoteRepository;
import com.crm.customerleadcrm.service.DashboardService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.crm.customerleadcrm.enums.LeadStatus;

import java.time.LocalDateTime;
import java.time.YearMonth;
import java.util.Comparator;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class DashboardServiceImpl implements DashboardService {

    private final CustomerLeadRepository customerLeadRepository;
    private final LeadTypeRepository leadTypeRepository;
    private final FollowUpRepository followUpRepository;
    private final NoteRepository noteRepository;

    // Configurable property for recent leads limit (default: 5)
    @Value("${dashboard.recent-leads-limit:5}")
    private int recentLeadsLimit;

    public DashboardServiceImpl(CustomerLeadRepository customerLeadRepository,
                                LeadTypeRepository leadTypeRepository,
                                FollowUpRepository followUpRepository,
                                NoteRepository noteRepository) {
        this.customerLeadRepository = customerLeadRepository;
        this.leadTypeRepository = leadTypeRepository;
        this.followUpRepository = followUpRepository;
        this.noteRepository = noteRepository;
    }

    @Override
    @Transactional(readOnly = true)
    public DashboardDto getDashboardMetrics() {

        DashboardDto dashboard = new DashboardDto();

        List<CustomerLead> allLeads = customerLeadRepository.findAll();
        List<FollowUp> allFollowUps = followUpRepository.findAll();

        // Total Leads
        long totalLeads = allLeads.size();
        dashboard.setTotalLeads(totalLeads);

        // Active Lead Types
        dashboard.setActiveLeadTypes(leadTypeRepository.count());

        // Notes Count
        dashboard.setNotesCount(noteRepository.count());

        // Reminder module not implemented yet
        dashboard.setRemindersDue(0L);

        // Pending Follow Ups
        long pendingFollowUps = allFollowUps.stream()
                .filter(f -> f.getStatus() != null &&
                        (
                                f.getStatus().equalsIgnoreCase("FOLLOW_UP") ||
                                f.getStatus().equalsIgnoreCase("CONTACTED") ||
                                f.getStatus().equalsIgnoreCase("INTERESTED") ||
                                f.getStatus().equalsIgnoreCase("NEGOTIATION") ||
                                f.getStatus().equalsIgnoreCase("VISIT_SCHEDULED")
                        ))
                .count();

        dashboard.setPendingFollowUps(pendingFollowUps);

        // Completed Follow Ups
        long completedFollowUps = allFollowUps.stream()
                .filter(f -> f.getStatus() != null &&
                        f.getStatus().equalsIgnoreCase("CLOSED_WON"))
                .count();

        dashboard.setCompletedFollowUps(completedFollowUps);

        // Lead Status Counts
        Map<String, Long> statusCounts = allLeads.stream()
                .filter(l -> l.getStatus() != null)
                .collect(Collectors.groupingBy(
                        l -> l.getStatus().name(),
                        Collectors.counting()
                ));

        dashboard.setLeadStatusCounts(statusCounts);

        // Monthly Lead Counts - FIXED: Group by Year-Month instead of just month
        Map<String, Long> monthlyCounts = allLeads.stream()
                .filter(l -> l.getCreatedAt() != null)
                .collect(Collectors.groupingBy(
                        l -> {
                            LocalDateTime createdAt = l.getCreatedAt();
                            return createdAt != null ? YearMonth.from(createdAt.toLocalDate()).toString() : "UNKNOWN";
                        },
                        LinkedHashMap::new,  // Maintain insertion order
                        Collectors.counting()
                ));

        dashboard.setMonthlyLeadCounts(monthlyCounts);

        // Conversion Rate
        long convertedLeads = allLeads.stream()
                .filter(l -> l.getStatus() == LeadStatus.CLOSED_WON)
                .count();

        double conversionRate =
                totalLeads == 0
                        ? 0
                        : ((double) convertedLeads / totalLeads) * 100;

        dashboard.setConversionRate(
                Math.round(conversionRate * 100.0) / 100.0
        );

        // Recent Leads - using configurable limit
        List<CustomerLeadDto> recentLeads = allLeads.stream()
                .sorted((a, b) -> {
                    LocalDateTime dateA = a.getCreatedAt();
                    LocalDateTime dateB = b.getCreatedAt();
                    if (dateA == null || dateB == null) return 0;
                    return dateB.compareTo(dateA);  // Reverse order (most recent first)
                })
                .limit(recentLeadsLimit)
                .map(CustomerLeadMapper::toDto)
                .collect(Collectors.toList());

        dashboard.setRecentLeads(recentLeads);

        return dashboard;
    }
}