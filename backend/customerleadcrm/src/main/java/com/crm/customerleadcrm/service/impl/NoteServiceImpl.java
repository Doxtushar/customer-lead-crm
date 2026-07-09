package com.crm.customerleadcrm.service.impl;

import com.crm.customerleadcrm.dto.NoteDto;
import com.crm.customerleadcrm.entity.CustomerLead;
import com.crm.customerleadcrm.entity.Note;
import com.crm.customerleadcrm.exception.ResourceNotFoundException;
import com.crm.customerleadcrm.mapper.NoteMapper;
import com.crm.customerleadcrm.repository.CustomerLeadRepository;
import com.crm.customerleadcrm.repository.NoteRepository;
import com.crm.customerleadcrm.service.NoteService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class NoteServiceImpl implements NoteService {

    private final NoteRepository noteRepository;
    private final CustomerLeadRepository customerLeadRepository;

    public NoteServiceImpl(NoteRepository noteRepository, CustomerLeadRepository customerLeadRepository) {
        this.noteRepository = noteRepository;
        this.customerLeadRepository = customerLeadRepository;
    }

    @Override
    @Transactional
    public NoteDto createNote(NoteDto noteDto) {
        Note note = NoteMapper.toEntity(noteDto);

        CustomerLead customerLead = customerLeadRepository.findById(noteDto.getCustomerLeadId())
                .orElseThrow(() -> new ResourceNotFoundException("CustomerLead not found with id: " + noteDto.getCustomerLeadId()));
        
        note.setCustomerLead(customerLead);

        Note savedNote = noteRepository.save(note);
        return NoteMapper.toDto(savedNote);
    }

    @Override
    @Transactional(readOnly = true)
    public List<NoteDto> getAllNotes() {
        return noteRepository.findAll().stream()
                .map(NoteMapper::toDto)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public List<NoteDto> getNotesByCustomerLeadId(Long customerLeadId) {
        return noteRepository.findByCustomerLeadId(customerLeadId).stream()
                .map(NoteMapper::toDto)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public NoteDto getNoteById(Long id) {
        Note note = noteRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Note not found with id: " + id));
        return NoteMapper.toDto(note);
    }

    @Override
    @Transactional
    public NoteDto updateNote(Long id, NoteDto noteDto) {
        Note existingNote = noteRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Note not found with id: " + id));

        CustomerLead customerLead = customerLeadRepository.findById(noteDto.getCustomerLeadId())
                .orElseThrow(() -> new ResourceNotFoundException("CustomerLead not found with id: " + noteDto.getCustomerLeadId()));

        existingNote.setContent(noteDto.getContent());
        existingNote.setCustomerLead(customerLead);

        Note updatedNote = noteRepository.save(existingNote);
        return NoteMapper.toDto(updatedNote);
    }

    @Override
    @Transactional
    public void deleteNote(Long id) {
        Note note = noteRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Note not found with id: " + id));
        noteRepository.delete(note);
    }
}