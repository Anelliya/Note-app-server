import { randomUUID } from 'crypto';
import { Injectable } from '@nestjs/common';
import { CreateNoteDto } from '../dto/create-note.dto';
import { UpdateNoteDto } from '../dto/update-note.dto';
import { Status, Category, Note } from '../entities/note.entity';
import { Stats } from '../entities/stats.entity';
import { notesDatabase } from '../database/notes.database';
import { unixTimestamp } from '../helpers/datetime';

@Injectable()
export class NotesRepository {
  private readonly notes: Note[] = notesDatabase;

  stats(): Stats[] {
    const initialStats: Stats[] = Object.values(Category).map((category) => {
      return {
        category: category,
        active: 0,
        archived: 0,
      };
    });

    return this.notes.reduce((previous: Stats[], current: Note): Stats[] => {
      const statsIndex: number = previous.findIndex((stats: Stats) => {
        return stats.category === current.category;
      });
      previous[statsIndex][current.status] += 1;
      return previous;
    }, initialStats);
  }

  create(note: CreateNoteDto): Note {
    const newNote: Note = {
      ...note,
      id: randomUUID(),
      created: unixTimestamp(),
      status: Status.Active,
    };
    this.notes.push(newNote);
    return newNote;
  }

  remove(id: string): boolean {
    const index: number = this.notes.findIndex((note) => note.id === id);
    if (index < 0) {
      return false;
    }
    this.notes.splice(index, 1);
    return true;
  }

  findAll(): Note[] {
    return this.notes;
  }

  findOne(id: string): Note {
    return this.notes.find((note) => note.id === id);
  }

  update(id: string, note: UpdateNoteDto): Note {
    const index: number = this.notes.findIndex((note) => note.id === id);
    if (index < 0) {
      return null;
    }
    this.notes[index] = {
      ...this.notes[index],
      ...note,
    };
    return this.notes[index];
  }
}
