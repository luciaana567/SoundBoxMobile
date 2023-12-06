export class ListStyleToGetMusicNeverAlreadyHeardDTO {
  userId?: number;
  stylesId?: number[];

  constructor(init?: Partial<ListStyleToGetMusicNeverAlreadyHeardDTO>) {
    Object.assign(this, init);
  }
}
