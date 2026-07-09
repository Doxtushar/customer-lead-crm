package com.crm.customerleadcrm.controller;

import com.crm.customerleadcrm.dto.FollowUpDto;
import com.crm.customerleadcrm.service.FollowUpService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/follow-ups")
@CrossOrigin(origins = "*")
public class FollowUpController {

    private final FollowUpService followUpService;

    public FollowUpController(FollowUpService followUpService) {
        this.followUpService = followUpService;
    }

    @PostMapping
    public ResponseEntity<FollowUpDto> createFollowUp(@Valid @RequestBody FollowUpDto followUpDto) {
        FollowUpDto createdFollowUp = followUpService.createFollowUp(followUpDto);
        return new ResponseEntity<>(createdFollowUp, HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<FollowUpDto>> getAllFollowUps() {
        List<FollowUpDto> followUps = followUpService.getAllFollowUps();
        return ResponseEntity.ok(followUps);
    }

    @GetMapping("/lead/{customerLeadId}")
    public ResponseEntity<List<FollowUpDto>> getFollowUpsByLead(@PathVariable Long customerLeadId) {
        List<FollowUpDto> followUps = followUpService.getFollowUpsByCustomerLeadId(customerLeadId);
        return ResponseEntity.ok(followUps);
    }

    @GetMapping("/{id}")
    public ResponseEntity<FollowUpDto> getFollowUpById(@PathVariable Long id) {
        FollowUpDto followUpDto = followUpService.getFollowUpById(id);
        return ResponseEntity.ok(followUpDto);
    }

    @PutMapping("/{id}")
    public ResponseEntity<FollowUpDto> updateFollowUp(@PathVariable Long id, @Valid @RequestBody FollowUpDto followUpDto) {
        FollowUpDto updatedFollowUp = followUpService.updateFollowUp(id, followUpDto);
        return ResponseEntity.ok(updatedFollowUp);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteFollowUp(@PathVariable Long id) {
        followUpService.deleteFollowUp(id);
        return ResponseEntity.noContent().build();
    }
}