package com.crm.customerleadcrm.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public class NoteDto {

    private Long id;

    @NotBlank(message = "Note content is required")
    private String content;

    @NotNull(message = "Customer Lead ID is required")
    private Long customerLeadId;

    public NoteDto() {
    }

    public NoteDto(Long id, String content, Long customerLeadId) {
        this.id = id;
        this.content = content;
        this.customerLeadId = customerLeadId;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public Long getCustomerLeadId() {
        return customerLeadId;
    }

    public void setCustomerLeadId(Long customerLeadId) {
        this.customerLeadId = customerLeadId;
    }
}