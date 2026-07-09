package com.crm.customerleadcrm.controller;

import com.crm.customerleadcrm.dto.LeadTypeDto;
import com.crm.customerleadcrm.service.LeadTypeService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/lead-types")
@CrossOrigin(origins = "*")
public class LeadTypeController {

    private final LeadTypeService leadTypeService;

    public LeadTypeController(LeadTypeService leadTypeService) {
        this.leadTypeService = leadTypeService;
    }

    @PostMapping
    public ResponseEntity<LeadTypeDto> createLeadType(@Valid @RequestBody LeadTypeDto leadTypeDto) {
        LeadTypeDto createdLeadType = leadTypeService.createLeadType(leadTypeDto);
        return new ResponseEntity<>(createdLeadType, HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<LeadTypeDto>> getAllLeadTypes() {
        List<LeadTypeDto> leadTypes = leadTypeService.getAllLeadTypes();
        return ResponseEntity.ok(leadTypes);
    }

    @GetMapping("/{id}")
    public ResponseEntity<LeadTypeDto> getLeadTypeById(@PathVariable Long id) {
        LeadTypeDto leadTypeDto = leadTypeService.getLeadTypeById(id);
        return ResponseEntity.ok(leadTypeDto);
    }

    @PutMapping("/{id}")
    public ResponseEntity<LeadTypeDto> updateLeadType(@PathVariable Long id, @Valid @RequestBody LeadTypeDto leadTypeDto) {
        LeadTypeDto updatedLeadType = leadTypeService.updateLeadType(id, leadTypeDto);
        return ResponseEntity.ok(updatedLeadType);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteLeadType(@PathVariable Long id) {
        leadTypeService.deleteLeadType(id);
        return ResponseEntity.noContent().build();
    }
}