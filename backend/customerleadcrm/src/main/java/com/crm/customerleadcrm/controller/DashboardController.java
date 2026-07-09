package com.crm.customerleadcrm.controller;

import com.crm.customerleadcrm.dto.DashboardDto;
import com.crm.customerleadcrm.service.DashboardService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/dashboard")
@CrossOrigin(origins = "*")
public class DashboardController {

    private final DashboardService dashboardService;

    public DashboardController(DashboardService dashboardService) {
        this.dashboardService = dashboardService;
    }

    @GetMapping
    public ResponseEntity<DashboardDto> getDashboardMetrics() {
        DashboardDto dashboardMetrics = dashboardService.getDashboardMetrics();
        return ResponseEntity.ok(dashboardMetrics);
    }
}