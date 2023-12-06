export class AlreadyHeardToSaveDTO {
  id?: number;
  musicId?: number;
  userId?: number;

  constructor(init?: Partial<AlreadyHeardToSaveDTO>) {
    Object.assign(this, init);
  }
}
