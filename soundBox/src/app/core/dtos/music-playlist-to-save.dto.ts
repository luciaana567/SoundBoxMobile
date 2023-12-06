export class MusicPlaylistToSaveDTO {
  id: number = 0;
  musicId?: number;
  playListId?: number;
  userId?: number;

  constructor(init?: Partial<MusicPlaylistToSaveDTO>) {
    Object.assign(this, init);
  }
}
