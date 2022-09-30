import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { NotesRepository } from './repositories/notes.repository';
import { Note } from './entities/note.entity';

@Injectable()
export class NotesService {
  constructor(private readonly repository: NotesRepository) {}

  create(createNoteDto: CreateNoteDto): Note {
    console.log('create new note');
    return this.repository.create(createNoteDto);
  }

  findAll(): Note[] {
    console.log('findAll notes');
    return this.repository.findAll();
  }

  findOne(id: string): Note {
    console.log(`findOne note with id=#${id}`);
    const note: Note = this.repository.findOne(id);
    if (note) {
      return note;
    }
    throw new NotFoundException();
  }

  update(id: string, updateNoteDto: UpdateNoteDto): Note {
    console.log(`update note with id=#${id}`);
    const note: Note = this.repository.update(id, updateNoteDto);
    if (note) {
      return note;
    }
    throw new NotFoundException();
  }

  remove(id: string): void {
    console.log(`remove a note with id=#${id}`);
    const removed: boolean = this.repository.remove(id);
    if (!removed) {
      throw new NotFoundException();
    }
  }

  stats() {
    return this.repository.stats();
  }
}
