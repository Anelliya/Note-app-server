import { IsString, IsIn, ValidateIf } from 'class-validator';
import { Category as NoteCategory } from '../entities/note.entity';

export class CreateNoteDto {
  @IsString()
  name: string;

  @IsString()
  content: string;

  @IsIn(Object.values(NoteCategory))
  category: string;

  @IsString()
  @ValidateIf((object, value) => value !== null)
  dates: string | null;
}
