package com.crm.customerleadcrm.service;

import com.crm.customerleadcrm.dto.NoteDto;
import java.util.List;

public interface NoteService {
    
    NoteDto createNote(NoteDto noteDto);
    
    List<NoteDto> getAllNotes();
    
    List<NoteDto> getNotesByCustomerLeadId(Long customerLeadId);
    
    NoteDto getNoteById(Long id);
    
    NoteDto updateNote(Long id, NoteDto noteDto);
    
    void deleteNote(Long id);
}