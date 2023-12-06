export class MusicDTO {
  id: number = 0;
  name: string = '';
  description: string = '';
  artistName: string = '';
  albumName: string = '';
  idImgArtist: string = '';
  urlImgArtist: string = '';
  idImgAlbum: string = '';
  urlImgAlbum: string = '';
  idImgMusic: string = '';
  urlImgMusic: string = '';
  idTrack: string = '';
  urlTrack: string = '';
  musicAlreadyHeard: boolean = false;
  inPlaylist: boolean = false;
  duration: string = '';

  constructor(init?: Partial<MusicDTO>) {
    Object.assign(this, init);
  }
}
