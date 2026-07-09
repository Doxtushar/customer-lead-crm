package com.crm.customerleadcrm.controller;

import com.crm.customerleadcrm.dto.CustomerLeadDto;
import com.crm.customerleadcrm.service.CustomerLeadService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/customer-leads")
@CrossOrigin(origins = "*")
public class CustomerLeadController {

    private final CustomerLeadService customerLeadService;

    public CustomerLeadController(CustomerLeadService customerLeadService) {
        this.customerLeadService = customerLeadService;
    }

    @PostMapping
    public ResponseEntity<CustomerLeadDto> createCustomerLead(@Valid @RequestBody CustomerLeadDto customerLeadDto) {
        CustomerLeadDto createdLead = customerLeadService.createCustomerLead(customerLeadDto);
        return new ResponseEntity<>(createdLead, HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<CustomerLeadDto>> getAllCustomerLeads() {
        List<CustomerLeadDto> customerLeads = customerLeadService.getAllCustomerLeads();
        return ResponseEntity.ok(customerLeads);
    }

    @GetMapping("/{id}")
    public ResponseEntity<CustomerLeadDto> getCustomerLeadById(@PathVariable Long id) {
        CustomerLeadDto customerLeadDto = customerLeadService.getCustomerLeadById(id);
        return ResponseEntity.ok(customerLeadDto);
    }

    @PutMapping("/{id}")
    public ResponseEntity<CustomerLeadDto> updateCustomerLead(@PathVariable Long id, @Valid @RequestBody CustomerLeadDto customerLeadDto) {
        CustomerLeadDto updatedLead = customerLeadService.updateCustomerLead(id, customerLeadDto);
        return ResponseEntity.ok(updatedLead);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCustomerLead(@PathVariable Long id) {
        customerLeadService.deleteCustomerLead(id);
        return ResponseEntity.noContent().build();
    }
}