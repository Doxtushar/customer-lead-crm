package com.crm.customerleadcrm.controller;

import com.crm.customerleadcrm.dto.NoteDto;
import com.crm.customerleadcrm.service.NoteService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/notes")
@CrossOrigin(origins = "*")
public class NoteController {

    private final NoteService noteService;

    public NoteController(NoteService noteService) {
        this.noteService = noteService;
    }

    @PostMapping
    public ResponseEntity<NoteDto> createNote(@Valid @RequestBody NoteDto noteDto) {
        NoteDto createdNote = noteService.createNote(noteDto);
        return new ResponseEntity<>(createdNote, HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<NoteDto>> getAllNotes() {
        List<NoteDto> notes = noteService.getAllNotes();
        return ResponseEntity.ok(notes);
    }

    @GetMapping("/{id}")
    public ResponseEntity<NoteDto> getNoteById(@PathVariable Long id) {
        NoteDto noteDto = noteService.getNoteById(id);
        return ResponseEntity.ok(noteDto);
    }

    @GetMapping("/lead/{customerLeadId}")
    public ResponseEntity<List<NoteDto>> getNotesByLead(@PathVariable Long customerLeadId) {
        List<NoteDto> notes = noteService.getNotesByCustomerLeadId(customerLeadId);
        return ResponseEntity.ok(notes);
    }

    @PutMapping("/{id}")
    public ResponseEntity<NoteDto> updateNote(@PathVariable Long id, @Valid @RequestBody NoteDto noteDto) {
        NoteDto updatedNote = noteService.updateNote(id, noteDto);
        return ResponseEntity.ok(updatedNote);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteNote(@PathVariable Long id) {
        noteService.deleteNote(id);
        return ResponseEntity.noContent().build();
    }
}