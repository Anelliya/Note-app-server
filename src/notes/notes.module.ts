import { Module } from '@nestjs/common';
import { NotesService } from './notes.service';
import { NotesController } from './notes.controller';
import { NotesRepository } from './repositories/notes.repository';

@Module({
  controllers: [NotesController],
  providers: [NotesService, NotesRepository],
})
export class NotesModule {}
