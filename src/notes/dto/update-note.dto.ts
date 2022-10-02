import { PartialType } from '@nestjs/mapped-types';
import { CreateNoteDto } from './create-note.dto';
import { IsIn, ValidateIf } from 'class-validator';

import { Status as NoteStatus } from '../entities/note.entity';

export class UpdateNoteDto extends PartialType(CreateNoteDto) {
  @IsIn(Object.values(NoteStatus))
  @ValidateIf((object, value) => value !== undefined)
  status: string;
}
