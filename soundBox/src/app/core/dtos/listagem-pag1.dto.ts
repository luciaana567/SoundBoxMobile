import { Observable } from 'rxjs';
import { MusicDTO } from './music.dto';

export class ListagemTab1DTO {
  lista1?: MusicDTO[];
  lista2?: MusicDTO[];
  lista3?: MusicDTO[];

  constructor(init?: Partial<ListagemTab1DTO>) {
    Object.assign(this, init);
  }
}
